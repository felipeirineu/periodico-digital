import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { readPreview } from './ambiente.mjs';

const origin = 'http://127.0.0.1:8080';

const server = createServer(async (incoming, outgoing) => {
  try {
    const request = new Request(origin + incoming.url, {
      method: incoming.method,
      headers: incoming.headers,
    });
    const response = await readPreview(request);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body) {
      await pipeline(Readable.fromWeb(response.body), outgoing);
    } else {
      outgoing.end();
    }
  } catch {
    if (!outgoing.headersSent) outgoing.writeHead(500);
    outgoing.end('Não foi possível carregar a prévia local.');
  }
});

server.listen(8080, '127.0.0.1', () => console.log('Prévia em ' + origin));
