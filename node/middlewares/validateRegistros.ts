import { json } from 'co-body'

export async function validateRegistrosProps(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const body = await json(ctx.req)
  const {
    clients: {masterdata},
  } = ctx

  let algunCorrecto = null 
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formatDateYesterday = yesterday.toISOString().slice(0, 10);
  const docs = await masterdata.searchDocumentsWithPaginationInfo(
    {
      dataEntity:'CI',
      fields:["fecha","hora","resultado","numero"],
      pagination: {page:1,pageSize:10},
      where : `(numero=${body.numero}) AND (fecha between ${formatDateYesterday}T${body.hora} AND ${body.fecha})`
    }) 
    if (!docs) {
        ctx.status = 404
        return
    }
    else {
        algunCorrecto  = docs.data.some((registro:any) => registro.resultado == true)
    }
    ctx.status = 200
    if(algunCorrecto) {
        ctx.body = {
        attempts: 0,
        ok: true,
        msg: "Puedes intentar de nuevo."  ,
        docs
    }}
    
    else {
        ctx.body = {
            attempts: docs.data.length,
            formatDateYesterday,
            docs,
            ok: docs.data.length <2 ,
            msg: docs.data.length >=2 ?"Por precaución, hemos detenido el uso de tu tarjeta durante 24 horas para compras en estilos.com.pe. Si necesitas ayuda, ¡contáctanos al 01 614 8400 sin dudarlo!" :
            `Recuerda que tienes 3 intentos para ingresar tu clave.`
        } 
    }
    
    ctx.set('Cache-Control', 'no-cache')
    await next()
}
