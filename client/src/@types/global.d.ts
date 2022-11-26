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
  id: number,
  name: string,
  uri: string,
  count: number,
  createdDate: string,
  exists: boolean,
}

type template_cards = {
  id: number,
  name: string,
  item_ids: Array<number>,
  background_color: string,
}

type address = {
  id: number,
  name: string,

}

type multipleType = card_detail | template_cards | address;

type setting_contents = {
  vol: number,
}

type ws_props = {
  name: string,
  card_ids: number[],
}