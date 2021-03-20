const idForLogginChat = -584851262

export class Logger {
  private chatIdOrigem: Number
  private idForLogginChat: Number
  private bot: any
  constructor(bot: any, id?: Number){
    this.chatIdOrigem = id
    this.idForLogginChat = idForLogginChat
    this.bot = bot
  }

  info(msg: string){
    if (this.idForLogginChat === this.chatIdOrigem) return
    this.bot.sendMessage(this.idForLogginChat, msg)
  }
}