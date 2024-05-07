import { json } from 'co-body'
// product
export async function validateProductByRefIdProps(
  ctx: Context,
  next: () => Promise<unknown>
) {

  const body = await json(ctx.req);

  const {
    vtex: {
      route: {
        params: { refId },
      },
    },
    clients: {product },
  } = ctx;

  //buscar esto dentro de catalog.d.ts que esta en node modules

  const targetProduct = await product.updateProduct(refId,body);

  if (!targetProduct) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
     targetProduct
  }
  
  ctx.set('Cache-Control', 'no-cache')

  await next();
}