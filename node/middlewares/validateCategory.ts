// import { json } from 'co-body'
// category
export async function validateCategoryByIdProps(
  ctx: Context,
  next: () => Promise<unknown>
) {

  // const data = await json(ctx.req);

  const {
    vtex: {
      route: {
        params: { categoryId },
      },
    },
    clients: { category},
  } = ctx;

  //buscar esto dentro de catalog.d.ts que esta en node modules

  const targetCategory = await category.getCategory(categoryId)

  if (!targetCategory) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
     targetCategory
  }
  
  ctx.set('Cache-Control', 'no-cache')

  await next();
}