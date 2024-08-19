import {  Catalog } from '@vtex/clients'

export class CollectionClient extends Catalog{
  public async getCollection(id:any) {
    const targetCollection:any = await this.http.get(
      `/api/catalog/pvt/collection/${id}/products`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    return targetCollection
  }
}