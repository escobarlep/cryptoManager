import { IMessage } from '@interfaces/Telegram'
import { ITrackingOrder, TrackingOrder } from '@models/track'
import { AddTrackingOrder, UpdateTrackingOrder } from '@services/track'
import { TrackingError } from './TrackingErrors'

export class TrackingController {
  private bot: any

  constructor(bot: any){
    this.bot = bot
  }
  public listTrackingOrders(arg0: any) {
    throw new TrackingError();
  }

  public async addTrackingOrder(msg: IMessage, symbols: string[]) {
    let response: string
    console.log(symbols)
    const mappedSymbols = symbols.map(symbol => symbol?.toUpperCase()).join(',')
    console.log(mappedSymbols)
    try {
      this.validateSymbols(symbols)
      await this.checkForAdminPowers(msg.chat.id)
      const order = new TrackingOrder()
      order.symbols = mappedSymbols
      order.chat_id = msg.chat.id
      order.user = msg.from.username
      const addService = new AddTrackingOrder()
      await addService.call(order)
      response = 'Ordem de rastreio criada'
    } catch (error) {
      response = `Houve um erro na requisição: \nDescrição: ${error.message}`
      if (/SQLITE_CONSTRAINT/.test(error.message)) {
        this.updateTrackingController({ chat_id: msg.chat.id, symbols: mappedSymbols })
        response = 'Ordem de rastreio atualizada'
      }
    }
    return this.bot.sendMessage(msg.chat.id, response)
  }
  updateTrackingController(data) {
    const update = new UpdateTrackingOrder()
    update.call(data)
  }

  private async checkForAdminPowers(id: Number) {
    try {
      const admins = await this.bot.getChatAdministrators(id)

      if (admins) {
        const idAdmin = admins.find(({ user }) => user.id === Number(process.env.BOT_ID))
        if (!idAdmin) throw new TrackingError('no_admin_privileges')
      }  
    } catch (error) {
      throw new TrackingError('no_admin_privileges')
    }
  }
  private validateSymbols(symbols: string[]) {
    symbols.forEach(symbol => {
      const checkIfHasUnderline = symbol.split('_')
      if (checkIfHasUnderline.length !== 2) throw new TrackingError(`invalid coin ${symbol}`)
    });
  }
}