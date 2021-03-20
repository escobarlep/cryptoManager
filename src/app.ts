const TelegramBot = require('node-telegram-bot-api')
import { FetchCoin, FetchListOfCoins, ListCoins } from '@services/coin'

export default () => {
  const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})

  bot.onText(/\/coin (.+)/, async (msg: any, match: any[]) => {
    const { id } = msg.chat
    try {
      if (!match.length) bot.sendMessage(id, 'Use "/coin help" para acessar os comandos')

      const options = match[1]?.split(' ')
      const firstArg = options[0] && options[0].trim().toUpperCase() 
      if (firstArg === 'ALL') {
        const secondArg = options[1]?.trim()?.toUpperCase() 
        const listService = new ListCoins()
        const coinString: string = await listService.call(secondArg)
        bot.sendMessage(id, coinString)
        return
      }
      
      const fetchService = new FetchCoin(options)
      const coinString: string = await fetchService.call()

      bot.sendMessage(id, coinString)
      if (msg.chat.id != 203006280) bot.sendMessage(203006280, `${msg.chat.id} \n ${coinString}`)
    } catch (error) {
      try {
        console.error(error)
        const fetchService = new FetchListOfCoins()
        const symbols: string = await fetchService.call()
        const message = `Verifique a lista de moedas disponíveis: \n - ${symbols}`
        bot.sendMessage(id, message)
      } catch (err) {
        console.error(err)
        bot.sendMessage(id, 'Ops, deu treta aqui buscando tua Moeda :/')
      }
    }
  })

}
