/*
  data = {
    id          : number  || 固有のID
    name        : string  || タイトルでつけた名前
    count       : number  || 使用回数
    uri         : string  || 画像のパス
    createdDate : date    || 作成日
    exists      : boolean || 利用可能かどうか
  }
*/

type card_detail = {
  id: number = -1,
  name: string = '',
  uri: string = '',
  count: number = 0,
  createdDate: string = '',
  exists: boolean = false,
}

type template_cards = {
  id: number = -1,
  name: string = '',
  item_num: number = 0,
  item_ids: Array<number> = [],
  background_color: string = '',
  exists: boolean = false,
}

type address = {
  id: number = -1,
  name: string = '',
  exists: boolean = false,
}

interface User {
  _id: number,
  name: string,
  avatar: string,
}

interface Message {
  _id: number,
  text: string,
  createdAt: Date,
  user: User,
}

type talk = {
  id: number,
  talk_with: User,
  messages: Message[]
}


type multipleType = card_detail | template_cards | address | talk;

type setting_contents = {
  vol: number,
}

type ws_props = {
  name: string,
  card_ids: number[],
  exists: boolean,
}

type folder_type = {
  id: number,
  feather_name: string,
  background_color: string,
  cards_ids: number[],
}


type card_modify_type = 'upload' | 'delete' | 'edit' | 'reload';
type card_modify_props = {
  id?: number,
  title?: string,
  picture?: string,
}

// declare const ws_max_card: number = 8