export default (bot: any) => {

  bot.onText(/\/teste (.+)/, async (msg: any, match: any[]) => {
    console.log('aaa')
  })

}
