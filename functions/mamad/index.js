export async function onRequest({ request }) {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.replace(/^\/+/, '').split('/');

    const targetHost = parts[1];
    const newPath = '/' + parts.slice(2).join('/');

    url.hostname = targetHost;
    url.pathname = newPath;
    url.protocol = 'https';

    return fetch(new Request(url.toString(), request));
  } catch (e) {
    return new Response('Proxy error: ' + e.message, { status: 500 });
  }
}
