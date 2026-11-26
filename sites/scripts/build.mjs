import {readFile,writeFile,mkdir,readdir,copyFile} from 'node:fs/promises';
const files={'index.html':'text/html; charset=utf-8','style.css':'text/css; charset=utf-8','app.js':'text/javascript; charset=utf-8'};
for(const name of await readdir('src/media')){
  if(name.endsWith('.webp')) files['media/'+name]='image/webp';
  if(name.endsWith('.mp4')) files['media/'+name]='video/mp4';
  if(name.endsWith('.vtt')) files['media/'+name]='text/vtt; charset=utf-8';
}
const assets={};
const data=await readFile('src/data.js','utf8');
for(const [name,type] of Object.entries(files)){
  const source=await readFile('src/'+name);
  // A prévia v5 traz os próprios dados em app.js; data.js segue apenas no Worker (API).
  const bytes=source;
  assets['/'+name]={type,base64:bytes.toString('base64')};
}
const worker=await readFile('src/server.js','utf8');
await mkdir('dist/server',{recursive:true});
await mkdir('dist/.openai',{recursive:true});
await writeFile('dist/server/index.js','const assets='+JSON.stringify(assets)+';\n'+data+'\n'+worker);
await copyFile('.openai/hosting.json','dist/.openai/hosting.json');
