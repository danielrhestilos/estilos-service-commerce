export async function validateOrderProps(
  ctx: Context,
  next: () => Promise<unknown>
) {

  const {
    vtex: {
        route: {
          params: { orderId},
        },
      },
    clients: {order},
  } = ctx
  console.log("orderId: ",orderId);
  
  const targetOrder = await order.getOrderById(orderId)
  console.log("targetOrder-> ",targetOrder);
  
  const total = targetOrder.paymentData.transactions.reduce((total:any, transaction:any) => {
    return total + transaction.payments.reduce((sum:any, payment:any) => sum + (payment.referenceValue || 0), 0);
  }, 0)
  const totalDecimal = total/100
  if (!targetOrder) {
    ctx.status = 404
    return
  }

  ctx.status = 200
  ctx.body = {
     orderId:targetOrder.orderId,
     sequence:targetOrder.sequence,
     paymentTotal: totalDecimal,
     paymentType: targetOrder.paymentData.transactions[0].payments[0].paymentSystem,
     status:targetOrder.status, 
  }
  
  ctx.set('Cache-Control', 'no-cache')

  await next();
}
