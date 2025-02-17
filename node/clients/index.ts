import { IOClients } from '@vtex/api'

import { ProductClient } from './product'
import { CategoryClient } from './category'
import { CollectionClient } from './collection'
import {Logistics} from './logistics'
import KlaviyoClient from './klaviyo'
import { OrderClient } from './order'


export class Clients extends IOClients {
  public get product() {
    return this.getOrSet('product', ProductClient)
  }
  public get category() {
    return this.getOrSet('category', CategoryClient)
  }
  public get order(){
    return this.getOrSet('order', OrderClient)
  }
  public get collection() {
    return this.getOrSet('collection', CollectionClient)
  }

  public get klaviyo() {
    return this.getOrSet('klaviyo', KlaviyoClient)
  }
  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }
}
