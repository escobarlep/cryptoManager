export interface IMessage {
  message_id: Number
  from: IFrom
  chat: IChat
  date: Number
  text: String
  entities: IEntity[]
}

export interface IEntity { 
  offset: Number,
  length: Number,
  type: String
}

export interface IFrom {
  id: Number
  is_bot: Boolean
  first_name: String
  username: String
  language_code: String
}
export interface IChat {
  id: Number
  title: String
  type: String
  all_members_are_administrators: Boolean
}