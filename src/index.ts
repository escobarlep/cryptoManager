import { Coin } from '@models/coin'
import { TrackingOrder } from '@models/track/TrackingOrder'
import * as tasks from '@tasks/index'
import * as routes from './routes'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})
import schedule from 'node-schedule'

createConnection({
  type: 'sqlite',
  entities: [ Coin, TrackingOrder ],
  synchronize: true,
  database: process.env.DB_PATH
}).then(() => {
  const keys = Object.keys(routes)
  keys.forEach((key: string) => {
    routes[key](bot)
  });
  schedule.scheduleJob('*/5 * * * * *', function(){
    console.log('tasks.trackingQueue(bot)')
    tasks.trackingQueue(bot)
  })
  tasks.trackingQueue(bot)


})
  .catch(error => console.log(error))