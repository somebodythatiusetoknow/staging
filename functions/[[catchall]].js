export async function onRequest(context) {
  try {
    const { request } = context;

    const cfInfo = JSON.stringify(request.cf, null, 2);
    console.log('CF Info:', cfInfo); 

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
