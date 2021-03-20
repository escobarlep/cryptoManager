import { FetchCoin, FetchListOfCoins, ListCoins } from '@services/coin'

export default (bot: any) => {

  bot.onText(/\/coin (.+)/, async (msg: any, match: any[]) => {
    const { id } = msg.chat
    bot.sendMessage(id, 'Trabalhando na tua requisição')
    if (msg.chat.id != 203006280) bot.sendMessage(203006280, `${msg.chat.id} -- ${msg.from.first_name} -- coinRequest: ${msg.text}`)
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

      const a = await bot.sendMessage(id, coinString)
      bot.pinChatMessage(id, a.message_id)

    } catch (error) {
      console.log(error)
      try {
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
