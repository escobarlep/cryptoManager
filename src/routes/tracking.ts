import { TrackingController } from "@controllers/tracking/TrackingController"
import { IMessage } from '@interfaces/Telegram'
import { Logger } from "@services/log/Logger"

export default (bot: any) => {

  bot.onText(/\/track (.+)/, async (msg: IMessage, match: any[]) => {
    const { id } = msg.chat
    bot.sendMessage(id, 'Trabalhando na tua requisição')
    const log = new Logger(bot, id)
    log.info(`${id} -- ${msg.from.first_name} -- coinRequest: ${msg.text}`)

    try {
      if (!match.length) bot.sendMessage(id, 'Use "/track help" para acessar os comandos')
      const trackingController = new TrackingController(bot)
      const options = match[1]?.split(' ')
      const firstArg = options[0] && options[0].trim().toLowerCase()
      options.shift()
      switch (firstArg) {
        case 'add':
          trackingController.addTrackingOrder(msg, options)
          break;
        case 'list':
          trackingController.listTrackingOrders(options)
          break;
        case 'help':
          bot.sendMessage(id, 'Nem fiz ainda. Mas se quiser dar uma mão me avisa XD')
          break;

        default:
          bot.sendMessage(id, 'Use "/track help" para acessar os comandos')
          break;
      }

    } catch (error) {
      console.log(error)
    }
  })

}
