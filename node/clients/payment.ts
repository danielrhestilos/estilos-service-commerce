/* eslint-disable no-console */
import type { InstanceOptions, IOContext } from '@vtex/api';
import { JanusClient } from '@vtex/api';

export class PaymentClient extends JanusClient {
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
}
