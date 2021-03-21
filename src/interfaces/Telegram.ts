export interface IMessage {
  message_id: number
  from: IFrom
  chat: IChat
  date: number
  text: string
  entities: IEntity[]
}

export interface IEntity { 
  offset: number,
  length: number,
  type: string
}

export interface IFrom {
  id: number
  is_bot: boolean
  first_name: string
  username: string
  language_code: string
}
export interface IChat {
  id: number
  title: string
  type: string
  all_members_are_administrators: boolean
}