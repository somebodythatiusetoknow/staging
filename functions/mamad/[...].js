export async function onRequest({ request }) {
  try {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const targetHost = pathParts[2]; 

    if (!targetHost) {
      return new Response('Missing target host in URL', { status: 400 });
    }

    url.hostname = targetHost;
    url.protocol = 'https';
    url.pathname = '/' + pathParts.slice(3).join('/');

    return fetch(new Request(url.toString(), request));
  } catch (e) {
    return new Response('Proxy error: ' + e.message, { status: 500 });
  }
}
