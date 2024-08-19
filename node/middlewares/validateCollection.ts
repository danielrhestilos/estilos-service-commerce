export async function validateCollectionProps(
  ctx: Context,
  next: () => Promise<unknown>
) {

  const {
    vtex: {
      route: {
        params: {id},
      },
    },
    clients: { product,collection},
  } = ctx;

//   console.log('collection ', collection?.Data);
  
  const targetCollection = await collection.getCollection(id);

  const mapi = await Promise.all(targetCollection?.Data.map(async (item:any) => {
    try {
      const catalogProduct = await product.getProduct(item.ProductId);
      console.log("catalogProduct", catalogProduct);
      return catalogProduct;
    } catch (error) {
      console.error(`Failed to fetch data for ProductId ${item.ProductId}. Error:`, error.message);
      return null;  // Puedes optar por manejar el error de otra forma
    }
  }));
  
  if (!targetCollection) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
     mapi
  }
  
  ctx.set('Cache-Control', 'no-cache')

  await next();
}