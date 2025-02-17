/* eslint-disable no-console */
import type { InstanceOptions, IOContext } from '@vtex/api';
import { JanusClient } from '@vtex/api';

export class OrderClient extends JanusClient {
    constructor(context: IOContext, options?: InstanceOptions) {
        super(context, {
            ...(options ?? {}),
            headers: {
                ...(options?.headers ?? {}),
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                VtexIdClientAutCookie: `${
                    context.adminUserAuthToken ??
                    context.storeUserAuthToken ??
                    context.authToken ??
                    ''
                }`,
                'x-vtex-api-appkey': 'vtexappkey-estilospe-ZQVXFA',
                'x-vtex-api-apptoken': 'KQCVJQWBZWJKPLGQLGUTDLMJEMRLRQTMHWUYVMOUXENEUUHHGEJWVBLVRCEMJDDGNVVUDFFDQRJSMCKTNFKVVGXANMABBFDUYNFOFRUZMZUCDCOMEWLWGQASIPIZXVLP'
            },
        });
    }

    public getOrderById(id: string|string[]) {
        console.log('this: ',this)
        return this.http.get(
            `http://${this.context.account}.vtexcommercestable.com.br/api/oms/pvt/orders/${id}`,{
                headers: { VtexIdclientAutCookie: this.context.authToken },
            }
        );
    }
}
