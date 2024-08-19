import {  Catalog, Product } from '@vtex/clients'

export class ProductClient extends Catalog{

  public async getProduct(productId:any){
    const catalogProduct = await this.http.get(
      `/api/catalog/pvt/product/${productId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken ,
           "x-vtex-api-appkey": 'vtexappkey-estilospe-ZQVXFA',
          'x-vtex-api-apptoken': 'KQCVJQWBZWJKPLGQLGUTDLMJEMRLRQTMHWUYVMOUXENEUUHHGEJWVBLVRCEMJDDGNVVUDFFDQRJSMCKTNFKVVGXANMABBFDUYNFOFRUZMZUCDCOMEWLWGQASIPIZXVLP'},
         
      }
    )
    return catalogProduct
  }



  public async getProductRefId(refId: any) {
    const targetProduct:any = await this.http.get(
      `/api/catalog/pvt/stockkeepingunit?refId=${refId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    const {ProductId} =  targetProduct;

    const catalogProduct = await this.http.get(
      `/api/catalog/pvt/product/${ProductId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    
    return catalogProduct
  }

  public async updateProduct(refId: any,data:any) {
    const targetProduct:any = await this.http.get(
      `/api/catalog/pvt/stockkeepingunit?refId=${refId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    const {ProductId} =  targetProduct;

    const catalogProduct = await this.http.get(
      `/api/catalog/pvt/product/${ProductId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )

    const rp  =  await this.http.put<Product[]>(
      `/api/catalog/pvt/product/${ProductId}`,
      {...catalogProduct,Name:data.Name,Title:data.Title,MetaTagDescription:data.MetaTagDescription}
      // {...catalogProduct,DescriptionShort:data.DescriptionShort}
      ,{
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )

    return rp
  }


  public async updateAccesoriesProduct(refId: any,data:any) {
    const targetProduct:any = await this.http.get(
      `/api/catalog/pvt/stockkeepingunit?refId=${refId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    const {ProductId} =  targetProduct;

    const catalogProduct = await this.http.get(
      `/api/catalog/pvt/product/${ProductId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      
      }
    )

    const rp  =  await this.http.put<Product[]>(
      `/api/catalog/pvt/product/${ProductId}`,
      // {...catalogProduct,Name:data.Name,Title:data.Title,MetaTagDescription:data.MetaTagDescription}
      {...catalogProduct,DescriptionShort:data.DescriptionShort}
      ,{
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )

    return rp
  }
}