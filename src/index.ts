import { Coin } from '@models/coin'
import * as routes from './routes'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
//import app from './app'
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})

createConnection({
  type: 'sqlite',
  entities: [ Coin ],
  synchronize: true,
  database: process.env.DB_PATH
}).then(() => {
  const keys = Object.keys(routes)
  keys.forEach((key: string) => {
    routes[key](bot)
  });
})
  .catch(error => console.log(error))