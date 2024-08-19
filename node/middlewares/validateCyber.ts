import { json } from 'co-body'
// import { decrypt } from './utils'

export async function validateCyberProps(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const body = await json(ctx.req)
  const {data} = body
  const {
    clients: {masterdata},
  } = ctx

  console.log('data -->',data);
  
  const doc = await  masterdata.createDocument({
    dataEntity:"CB",
    fields: data,
  })

  if (!doc) {
    ctx.status = 404
    return
  }
  
  ctx.status = 200
  ctx.body = {
    result: "ok",
  }
  ctx.set('Cache-Control', 'no-cache')
  await next()
}