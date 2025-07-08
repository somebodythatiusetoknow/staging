export async function onRequest({ request }) {
  try {
    const url = new URL(request.url);
    const splitted = url.pathname.replace(/^\/+/, '').split('/');
    const address = splitted[0];
    url.pathname = '/' + splitted.slice(1).join('/');
    url.hostname = address;
    url.protocol = 'https';
    return fetch(new Request(url, request));
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}
