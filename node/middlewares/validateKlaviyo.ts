import { json } from 'co-body'
// product
export async function validateKlaviyoProps(
  ctx: Context,
  next: () => Promise<unknown>
) {

  const body = await json(ctx.req);

  const {
    clients: {klaviyo },
  } = ctx;

  //buscar esto dentro de catalog.d.ts que esta en node modules

  const target = await klaviyo.createProfile(body);

  if (!target) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
     target
  }
  
  ctx.set('Cache-Control', 'no-cache')

  await next();
}