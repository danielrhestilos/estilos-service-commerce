import type { InstanceOptions, IOContext, IOResponse } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class KlaviyoClient extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://a.klaviyo.com', context, options)
  }

  public async getStatus(status: number): Promise<string> {
    return this.http.get(status.toString(), {
      metric: 'status-get',
    })
  }

  public async createProfile(
    profile:any
  ): Promise<IOResponse<string>> {
    return this.http.post("/api/profiles/", profile,            {
      headers: { VtexIdclientAutCookie: this.context.authToken , /*"X-VTEX-Use-Https":true,"Content-Type": 'application/x-www-form-urlencoded'*/Authorization: "Klaviyo-API-Key pk_bfcaf4685b1a1b77195e1772f2abf4eb88"/*,revision:"2023-12-15"*/},
    })
  }

}