import {  Catalog, Product } from '@vtex/clients'
export class ProductClient extends Catalog{
  public async getProduct(refId: any) {
    const product = await this.http.get<Product[]>(
      `/api/catalog/pvt/stockkeepingunit/${refId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    return product
  }
  // public async getProductCatalog(productId:any) {
  //   const product = await this.http.get<Product>(
  //     `/api/catalog/pvt/product/${productId}`,
  //     {
  //       headers: { VtexIdclientAutCookie: this.context.authToken },
  //     }
  //   )
  //   return product
  // }
}
