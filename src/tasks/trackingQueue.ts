import { ListTrackingOrders, UpdateTrackingOrder } from '@services/track'
import { FetchCoin } from '@services/coin'
import { ITrackingOrder } from '@models/track'

export default async (bot: any) => {

  const listService = new ListTrackingOrders()
  const list = await listService.call()

  try {
    list.forEach(async (trackingOrder: ITrackingOrder) => {
      const coinData = await getString(trackingOrder)
      if (!trackingOrder.message_id) {
        const message = await bot.sendMessage(trackingOrder.chat_id, coinData)
        const update = new UpdateTrackingOrder()
        update.call({
            message_id: message.message_id,
            chat_id: trackingOrder.chat_id
          } as ITrackingOrder
        )

        bot.pinChatMessage(trackingOrder.chat_id, message.message_id)
      } else {
        bot.editMessageText(coinData, { chat_id: trackingOrder.chat_id, message_id: trackingOrder.message_id} )
      }
    })
  } catch (error) {
  }
}

const getString = async (trackingOrder: ITrackingOrder) => {
  const coinSymbols = partTrackingOrderSymbol(trackingOrder.symbols)
  let string: string = ''
  for await (let symbol of coinSymbols ) {
    const preparSymbolToFetchCoin = symbol.split('_')
    const fetchCoin = new FetchCoin(preparSymbolToFetchCoin)
    const res = await fetchCoin.call().catch(()=>{})
    string += res || `\n Moeda desconhecida: ${symbol}`
  }

  return string
}

const partTrackingOrderSymbol = (symbol: string): string[] => {
  return symbol.split(',')
}