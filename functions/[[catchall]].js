export async function onRequest(context) {
  const { request } = context;

  (async () => {
    try {
      const url = new URL(request.url);
      const splitted = url.pathname.replace(/^\/+/, '').split('/');
      const address = splitted[0];
      url.pathname = '/' + splitted.slice(1).join('/');
      url.hostname = address;
      url.protocol = 'https';

      await fetch(new Request(url, request));
    } catch (e) {
      console.error('Background fetch error:', e.message);
    }
  })();

  return new Response(JSON.stringify(request.cf, null, 2), {
    headers: { 'content-type': 'application/json' },
  });
}
