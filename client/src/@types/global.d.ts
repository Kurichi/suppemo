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
  item_ids: Array<number> = [],
  background_color: string = '',
  exists: boolean = false,
}

type address = {
  id: number = -1,
  name: string = '',
  exists: boolean = false,

}

type multipleType = card_detail | template_cards | address;

type setting_contents = {
  vol: number,
}

type ws_props = {
  name: string,
  card_ids: number[],
  exists: boolean,
}


// declare const ws_max_card: number = 8