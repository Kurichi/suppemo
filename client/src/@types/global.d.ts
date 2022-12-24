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

//==FILE SYSTEM TYPE =====================

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

type setting_contents = {
  vol: number,
}

type multipleType = card_detail | template_cards | address;

//==CHAT NAVIGATION TYPE=====================

type Talk = {
  talk_with: User,
  messages: IMessage[]
}


//== SCREEN PROPS=========================

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

type captureImage = {
  uri: string = '',
  height: number = 168,
  width: number = 240,
}


//==FILE SYSTEM MODIFY PROPS ===============================

type card_modify_type = 'upload' | 'delete' | 'edit' | 'reload';

type card_modify_props = {
  id?: number,
  title?: string,
  picture?: string,
}

type template_modify_props = {
  template_id?: number,
  card_id?: number,
  index?: number,
  title?: string,
  nonexistCard_id?: nubmer[],
}


//==NAVIGATION PROPS ================

type NavigationProps = {
  Home: {
    init_WS_index: number = 0,
  },
  TemplateList: {},
  ChatSelector: {},
  Camera: {},

  Login: {},
  SignUp: {},
  Chat: { talk: Talk },

  reader: {},
  show: {
    uri: string,
    height: number,
    width: number,
  },
  apply: {},
  list: {},
}