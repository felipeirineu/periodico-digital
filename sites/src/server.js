const privateHeaders = {'cache-control':'no-store','x-content-type-options':'nosniff'};
const json = (data, status=200) => Response.json(data,{status,headers:privateHeaders});
const error = (message,status=400) => json({error:message},status);
const formats = ['Reportagem','Galeria','Vídeo','História','Relato','Investigação','Entrevista','Agenda'];
const maxUpload = 12 * 1024 * 1024;
const clean = (value,max) => typeof value === 'string' && value.length <= max ? value.trim() : '';
const append = (bucket, key, value, onlyIf) => bucket.put(key,JSON.stringify(value),{onlyIf,httpMetadata:{contentType:'application/json'}});
const read = async (bucket,key) => (await bucket.get(key))?.json();
const recordKey = id => 'entries/'+id;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const idPattern = /^[a-z0-9-]{1,64}$/;
const today = () => new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Fortaleza'}).format();
const mediaPath = id => '/uploads/'+id;
const isStaff = role => role==='owner'||role==='curator';

async function readList(bucket,prefix) {
  const results = [];
  let cursor;
  do {
    const page = await bucket.list({prefix,cursor,limit:100});
    const values = await Promise.all(page.objects.map(item => read(bucket,item.key)));
    results.push(...values.filter(Boolean));
    cursor = page.truncated ? page.cursor : undefined;
  } while(cursor);
  return results;
}

async function identity(request,env) {
  const uid=request.headers.get('oai-authenticated-user-id');
  const email=request.headers.get('oai-authenticated-user-email')?.trim().toLowerCase();
  if(!uid||!email) return null;
  if(email===env.EDITOR_EMAIL?.trim().toLowerCase()) return {uid,email,role:'owner'};
  const permission=await read(env.BUCKET,'roles/'+encodeURIComponent(email));
  return {uid,email,role:permission?.role??'viewer',nap:permission?.nap??''};
}

function safeRecord(row) {
  const {ownerId,status,kind,...fields}=row;
  return fields;
}

async function getFeed(bucket) {
  const rows = (await readList(bucket,'entries/')).filter(row=>row.status==='approved');
  return {posts:rows.filter(row=>row.kind==='post').map(safeRecord),comments:rows.filter(row=>row.kind==='comment').map(safeRecord)};
}

async function pollResults(bucket,prefix) {
  const totals=Object.fromEntries(januaryPoll.options.map(({id})=>[id,0]));
  let cursor;
  do {
    const page=await bucket.list({prefix,cursor,include:['customMetadata']});
    for(const object of page.objects){
      const option=object.customMetadata?.option;
      if(Object.hasOwn(totals,option)) totals[option]++;
    }
    cursor=page.truncated?page.cursor:undefined;
  } while(cursor);
  return totals;
}

async function handlePoll(request,bucket,url) {
  if(!['GET','POST'].includes(request.method)) return error('Método indisponível.',405);
  const cookie=request.headers.get('cookie')??'';
  const voter=/(?:^|;\s*)__Host-entre-naps-vote=([a-f0-9-]{36})(?:;|$)/.exec(cookie)?.[1];
  const prefix=`polls/${januaryPoll.id}/votes/`;
  if(request.method==='GET'&&!voter){
    const headers=new Headers(privateHeaders);
    headers.set('set-cookie',`__Host-entre-naps-vote=${crypto.randomUUID()}; Path=/; Max-Age=15552000; Secure; HttpOnly; SameSite=Lax`);
    return Response.json({selected:null},{headers});
  }
  if(request.method==='POST'){
    if(request.headers.get('origin')!==url.origin) return error('Origem do envio inválida.',403);
    if(!voter) return error('Ative os cookies neste site e recarregue a página para votar.');
    const option=(await request.json().catch(()=>null))?.option;
    if(!januaryPoll.options.some(item=>item.id===option)) return error('Selecione um dos temas da enquete.');
    await bucket.put(prefix+voter,'',{onlyIf:{etagDoesNotMatch:'*'},customMetadata:{option}});
  }
  const selected=(await bucket.head(prefix+voter))?.customMetadata?.option??null;
  return json(selected?{selected,totals:await pollResults(bucket,prefix)}:{selected});
}

function signature(bytes,type) {
  const ascii=(start,length)=>String.fromCharCode(...bytes.slice(start,start+length));
  if(type==='image/jpeg') return bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
  if(type==='image/png') return ascii(0,8)==='\x89PNG\r\n\x1a\n';
  if(type==='image/webp') return ascii(0,4)==='RIFF'&&ascii(8,4)==='WEBP';
  if(type==='video/mp4') return ascii(4,4)==='ftyp';
  if(type==='video/webm') return ascii(0,4)==='\x1a\x45\xdf\xa3';
  return false;
}

async function submitPost(request,env,user) {
  if(user.role==='viewer') return error('Envio reservado ao comitê e à curadoria.',403);
  const size=Number(request.headers.get('content-length'));
  if(size>maxUpload+100000) return error('Os arquivos devem somar até 12 MB.',413);
  const reader=request.body?.getReader();
  if(!reader) return error('O formulário está vazio.');
  const chunks=[];
  let received=0;
  for(;;){
    const {value,done}=await reader.read();
    if(done) break;
    received+=value.length;
    if(received>maxUpload+100000){
      await reader.cancel();
      return error('Os arquivos devem somar até 12 MB.',413);
    }
    chunks.push(value);
  }
  const form=await new Response(new Blob(chunks),{headers:{'content-type':request.headers.get('content-type')??''}}).formData().catch(()=>null);
  if(!form) return error('Não foi possível ler o formulário.');
  const nap=clean(form.get('nap'),4);
  const title=clean(form.get('title'),140);
  const author=clean(form.get('author'),100);
  const topic=clean(form.get('topic'),55);
  const section=form.get('section')??'';
  const format=clean(form.get('format'),30);
  const deck=clean(form.get('deck'),280);
  const body=clean(form.get('body'),9000);
  const credit=clean(form.get('credit'),140);
  const skill=clean(form.get('skill'),400);
  const transcript=clean(form.get('transcript'),1500);
  if(!naps.some(item=>item.id===nap)||!formats.includes(format)||!title||!author||!topic||!deck||!body)
    return error('Confira NAP, editoria, formato, título, autoria, resumo e conteúdo.');
  if(section!==''&&!editorialSections.some(item=>item.id===section)) return error('Selecione uma seção válida.');
  if(user.nap&&user.nap!==nap) return error('Seu perfil só pode enviar para o próprio NAP.',403);
  const uploads=form.getAll('media').filter(file=>typeof file!=='string'&&file.size>0);
  if(uploads.length>4||uploads.reduce((sum,file)=>sum+file.size,0)>maxUpload) return error('Envie até quatro arquivos que somem até 12 MB.',413);
  if(uploads.length&&form.get('authorized')!=='yes') return error('Confirme a autorização de uso das mídias.');
  if(uploads.length && !clean(form.get('alt'),240)) return error('Descreva as mídias para acessibilidade.');
  const files=[];
  const id=crypto.randomUUID();
  for(const [index,file] of uploads.entries()){
    const bytes=new Uint8Array(await file.arrayBuffer());
    if(!signature(bytes,file.type)) return error('Use JPG, PNG, WebP, MP4 ou WebM válidos.');
    files.push({bytes,type:file.type,key:id+'-'+index});
  }
  if(files.some(file=>file.type.startsWith('video/'))&&!transcript) return error('Inclua um resumo acessível ou transcrição para o vídeo.');
  const alt=clean(form.get('alt'),240);
  const images=files.filter(file=>file.type.startsWith('image/')).map(file=>mediaPath(file.key));
  const videos=files.filter(file=>file.type.startsWith('video/')).map(file=>mediaPath(file.key));
  const post={id,nap,title,author,topic,section,format,deck,body,credit,skill,transcript,alt,images,videos,image:images[0],video:videos[0],status:'pending',kind:'post',date:today(),ownerId:user.uid};
  try {
    for(const file of files){
      await env.BUCKET.put('media/'+file.key,file.bytes,{httpMetadata:{contentType:file.type}});
    }
    await append(env.BUCKET,recordKey(id),post);
  } catch(problem){
    await Promise.allSettled(files.map(file=>env.BUCKET.delete('media/'+file.key)));
    throw problem;
  }
  return json({id,status:'pending'},201);
}

async function submitComment(request,env,user) {
  const payload=await request.json().catch(()=>null);
  const postId=clean(payload?.postId,64);
  const author=clean(payload?.author,75);
  const body=clean(payload?.body,1200);
  if(!author||!body||!idPattern.test(postId)) return error('Informe o nome de exibição e o comentário.');
  if(!posts.some(post=>post.id===postId)){
    const post=await read(env.BUCKET,recordKey(postId));
    if(post?.kind!=='post'||post.status!=='approved') return error('Publicação indisponível.',404);
  }
  const id=crypto.randomUUID();
  await append(env.BUCKET,recordKey(id),{id,postId,author,body,date:today(),kind:'comment',status:'pending',ownerId:user.uid});
  return json({id,status:'pending'},201);
}

async function decide(request,bucket,id) {
  const payload=await request.json().catch(()=>null);
  if(!['approved','rejected'].includes(payload?.status)) return error('Decisão inválida.');
  const key=recordKey(id);
  const object=await bucket.get(key);
  const row=object?await object.json():samplesInReview.find(item=>item.id===id);
  if(!row) return error('Item não encontrado.',404);
  if(row.status!=='pending') return error('Este item já foi revisado.',409);
  const result=await append(bucket,key,{...row,status:payload.status},object?{etagMatches:object.etag}:{etagDoesNotMatch:'*'});
  if(!result) return error('Este item foi revisado em outra sessão.',409);
  return json({id,status:payload.status});
}

async function serveUpload(request,env,user,id) {
  if(!/^[a-f0-9-]{36}-[0-3]$/.test(id)) return error('Arquivo não encontrado.',404);
  const row=await read(env.BUCKET,recordKey(id.slice(0,-2)));
  if(!row||(row.status!=='approved'&&(!user||(!isStaff(user.role)&&row.ownerId!==user.uid)))) return error('Arquivo não encontrado.',404);
  const key='media/'+id;
  const head=await env.BUCKET.head(key);
  if(!head) return error('Arquivo não encontrado.',404);
  const headers=new Headers(privateHeaders);
  head.writeHttpMetadata(headers);
  headers.set('accept-ranges','bytes');
  headers.set('content-length',head.size);
  let range;
  const input=request.headers.get('range');
  if(input){
    const match=/^bytes=(\d*)-(\d*)$/.exec(input);
    const suffix=match?.[2]?Number(match[2]):0;
    const start=match?.[1]?Number(match[1]):Math.max(0,head.size-suffix);
    const end=match?.[1]&&match[2]?Math.min(Number(match[2]),head.size-1):head.size-1;
    if(!match||start>=head.size||end<start) return new Response(null,{status:416,headers:{'content-range':'bytes */'+head.size}});
    range={offset:start,length:end-start+1};
    headers.set('content-range',`bytes ${start}-${end}/${head.size}`);
    headers.set('content-length',range.length);
  }
  const object=request.method==='HEAD'?null:await env.BUCKET.get(key,range?{range}:undefined);
  return new Response(object?.body??null,{status:range?206:200,headers});
}

async function api(request,env,url) {
  const path=url.pathname;
  if(!env.BUCKET) return error('O armazenamento está temporariamente indisponível.',503);
  if(path==='/api/poll') return handlePoll(request,env.BUCKET,url);
  if(path==='/api/feed'&&request.method==='GET') return json(await getFeed(env.BUCKET));
  const upload=path.startsWith('/uploads/')&&['GET','HEAD'].includes(request.method);
  const user=await identity(request,env);
  if(upload) return serveUpload(request,env,user,path.slice(9));
  if(!user) return error('Entre na conta com acesso ao periódico.',401);
  if(request.method==='GET'){
    if(path==='/api/session') return json({role:user.role,nap:user.nap??''});
    if(path==='/api/mine'){
      const rows=(await readList(env.BUCKET,'entries/')).filter(row=>row.ownerId===user.uid);
      return json({items:rows.map(row=>({id:row.id,title:row.title||'Comentário',kind:row.kind,status:row.status,date:row.date}))});
    }
    if(path==='/api/queue'&&isStaff(user.role)){
      const stored=await readList(env.BUCKET,'entries/');
      return json({items:[...samplesInReview.filter(sample=>!stored.some(row=>row.id===sample.id)),...stored.filter(row=>row.status==='pending')].map(({ownerId,...entry})=>entry)});
    }
    if(path==='/api/roles'&&user.role==='owner') return json({items:await readList(env.BUCKET,'roles/')});
    return error('Recurso indisponível para seu perfil.',403);
  }
  if(request.method!=='POST') return error('Método indisponível.',405);
  if(request.headers.get('origin')!==url.origin) return error('Origem do envio inválida.',403);
  if(path==='/api/posts') return submitPost(request,env,user);
  if(path==='/api/comments') return submitComment(request,env,user);
  const decision=/^\/api\/queue\/([a-z0-9-]{1,64})$/.exec(path);
  if(decision&&isStaff(user.role)) return decide(request,env.BUCKET,decision[1]);
  if(path==='/api/roles'&&user.role==='owner'){
    const payload=await request.json().catch(()=>null);
    const email=clean(payload?.email,150).toLowerCase();
    const role=payload?.role;
    const nap=clean(payload?.nap,4);
    if(!emailPattern.test(email)||!['viewer','committee','curator'].includes(role)||email===user.email) return error('Informe um e-mail válido e uma função permitida.');
    if(role==='committee'&&!naps.some(item=>item.id===nap)) return error('Selecione um NAP para o comitê.');
    const key='roles/'+encodeURIComponent(email);
    if(role==='viewer') await env.BUCKET.delete(key);
    else await append(env.BUCKET,key,{email,role,nap:role==='committee'?nap:''});
    return json({ok:true});
  }
  return error('Ação indisponível para seu perfil.',403);
}

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    try {
      if(url.pathname.startsWith('/api/')||url.pathname.startsWith('/uploads/')) return await api(request,env,url);
      const asset=assets[url.pathname==='/'?'/index.html':url.pathname];
      if(!asset||!['GET','HEAD'].includes(request.method)) return new Response('Página não encontrada',{status:404});
      const headers={'content-type':asset.type,'x-content-type-options':'nosniff','x-robots-tag':'noindex, nofollow','content-security-policy':"default-src 'none'; img-src 'self' data: blob:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; media-src 'self' blob:; connect-src 'self'; form-action 'self'; base-uri 'none'"};
      const bytes=Uint8Array.from(atob(asset.base64),letter=>letter.charCodeAt(0));
      headers['cache-control']=url.pathname.startsWith('/media/')?'private, max-age=3600':'no-cache';
      if(asset.type==='video/mp4'){
        headers['accept-ranges']='bytes';
        const match=/^bytes=(\d+)-(\d*)$/.exec(request.headers.get('range')??'');
        if(match){
          const offset=Number(match[1]);
          const end=match[2]?Math.min(Number(match[2]),bytes.length-1):bytes.length-1;
          if(offset>=bytes.length||end<offset) return new Response(null,{status:416,headers:{'content-range':'bytes */'+bytes.length}});
          headers['content-range']=`bytes ${offset}-${end}/${bytes.length}`;
          headers['content-length']=end-offset+1;
          return new Response(request.method==='HEAD'?null:bytes.slice(offset,end+1),{status:206,headers});
        }
      }
      headers['content-length']=bytes.length;
      return new Response(request.method==='HEAD'?null:bytes,{headers});
    } catch(problem){
      console.error(problem?.name??'Error',url.pathname);
      return error('Não foi possível concluir a operação agora.',503);
    }
  }
};
