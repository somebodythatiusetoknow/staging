export async function onRequest(context) {
  return new Response(JSON.stringify(context.request.cf, null, 2), {
    headers: { 'content-type': 'application/json' },
  });
}
