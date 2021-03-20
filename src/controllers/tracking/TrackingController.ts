import { IMessage } from '@interfaces/Telegram'
import { TrackingOrder } from '@models/track';
import { AddTrackingOrder } from '@services/track'

export class TrackingController {
  private bot: any

  constructor(bot: any){
    this.bot = bot
  }
  public listTrackingOrders(arg0: any) {
    throw new Error("Method not implemented.");
  }

  public addTrackingOrder(msg: IMessage, symbols: string[]) {
    try {
      this.validateSymbols(symbols)
      const order = new TrackingOrder()
      order.symbols = symbols.map(symbol => symbol?.toUpperCase()).join(',')
      order.chat_id = msg.chat.id
      order.message_id = msg.message_id
      order.user = msg.from.username
      const addService = new AddTrackingOrder()
      addService.call(order)
      this.bot.sendMessage(msg.chat.id, 'Ordem de rastreio criada')
    } catch (error) {
      this.bot.sendMessage(msg.chat.id, `Houve um erro na requisição: \nDescrição: ${error.message}`)
    }
  }

  private validateSymbols(symbols: string[]) {
    symbols.forEach(symbol => {
      const checkIfHasUnderline = symbol.split('_')
      if (checkIfHasUnderline.length !== 2) throw new Error(`invalid coin ${symbol}`)
    });
  }
}