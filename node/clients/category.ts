import {  Catalog  } from '@vtex/clients'

export class  CategoryClient extends Catalog{


  public async getCategory(categoryId:any) {
    const targetCategory:any = await this.http.get(
      `/api/catalog/pvt/category/${categoryId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    return targetCategory

  }


  public async updateCategory(categoryId: any,data:any) {

    // console.log('description',description);
    
    const targetCategory:any = await this.http.get(
      `/api/catalog/pvt/category/${categoryId}`,
      {
        headers: { VtexIdclientAutCookie: this.context.authToken },
      }
    )
    const updatedCategory:any =await this.http.put(`/api/catalog/pvt/category/${categoryId}`,{...targetCategory,Description:data.Description},
        {
            headers: { VtexIdclientAutCookie: this.context.authToken },
        }
    )
    return updatedCategory
    // return targetCategory
  }
}