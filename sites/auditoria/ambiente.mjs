import worker from '../dist/server/index.js';

const emptyBucket = {
  async list() {
    return { objects: [], truncated: false };
  },
  async get() {
    return null;
  },
  async head() {
    return null;
  },
};

export function readPreview(request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Prévia local somente para leitura.', {
      status: 405,
      headers: { allow: 'GET, HEAD' },
    });
  }

  // Only standard read headers are passed into the local Worker.
  const headers = new Headers();
  const range = request.headers.get('range');
  if (range) headers.set('range', range);

  return worker.fetch(
    new Request(request.url, { method: request.method, headers }),
    { BUCKET: emptyBucket },
  );
}
