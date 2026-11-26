import assert from 'node:assert/strict';
import { readPreview } from './ambiente.mjs';

const origin = 'http://127.0.0.1:8080';
const get = (path, options) => readPreview(new Request(origin + path, options));

const home = await get('/');
assert.equal(home.status, 200);
assert.match(await home.text(), /Entre NAPs/);

const assets = new Map([
  ['/style.css', /^text\/css/],
  ['/app.js', /^text\/javascript/],
  ['/media/robo.webp', /^image\/webp/],
  ['/media/agua.mp4', /^video\/mp4/],
  ['/media/artemis-imagens.webp', /^image\/webp/],
]);
for (const [path, type] of assets) {
  const result = await get(path);
  assert.equal(result.status, 200, path);
  assert.match(result.headers.get('content-type'), type, path);
  assert.ok((await result.arrayBuffer()).byteLength, path);
}

const video = await get('/media/agua.mp4', { headers: { range: 'bytes=0-31' } });
assert.equal(video.status, 206);
assert.equal((await video.arrayBuffer()).byteLength, 32);

const feed = await get('/api/feed');
assert.equal(feed.status, 200);
assert.deepEqual(await feed.json(), { posts: [], comments: [] });

const poll = await get('/api/poll');
assert.equal(poll.status, 200);
assert.deepEqual(await poll.json(), { selected: null });
assert.match(poll.headers.get('set-cookie'), /Secure; HttpOnly; SameSite=Lax/);

assert.equal((await get('/api/session')).status, 401);
assert.equal((await get('/api/comments', { method: 'POST' })).status, 405);

console.log('OK: página, ativos, vídeo, feed, cookie da enquete e acesso da prévia.');
