import axios from 'axios';
import * as FS from 'expo-file-system';
import { downloadAsync, makeDirectoryAsync } from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { AsyncStorage } from 'react-native';

const ws_max_card: number = 8
class multipleFS {
  protected file_path: string = "";
  protected _init: multipleType[] = [];

  constructor(file_path: string) {
    this.file_path = file_path
  }

  getIndex(data: Array<multipleType>, id: number): number {
    let res = -1
    data.forEach((value, index) => {
      if (value.id == id) res = index;
    })
    return res;
  }

  async initialize(): Promise<void> {
    if (!(await FS.getInfoAsync(this.file_path)).exists) {
      FS.writeAsStringAsync(this.file_path, JSON.stringify(this._init));
      console.log('create data file');
    }
  }

  async readData<T>(id: number): Promise<T>;
  async readData<T>(): Promise<Array<T>>;
  async readData<T>(id?: number) {
    await this.initialize();
    const data = JSON.parse(await FS.readAsStringAsync(this.file_path));

    if (typeof id == 'number') {
      const index = this.getIndex(data, id)
      return index != -1 ? data[index] : null;
    }
    else return data;
  }

  async modifyData(id: number, reject_data: object): Promise<boolean> {
    const data = JSON.parse(await FS.readAsStringAsync(this.file_path));
    const index = this.getIndex(data, id);

    if (index == -1) {
      console.log('存在しません')
      return false;
    }

    for (const [key, value] of Object.entries(reject_data)) {
      // console.log(`value: ${value}`)
      // console.log(`key: ${key}`)
      data[index][key] = value
      // console.log(data[index][key])
    }
    FS.writeAsStringAsync(this.file_path, JSON.stringify(data));
    return true;
  }

  async updateData(new_data: multipleType[]): Promise<void> {
    FS.writeAsStringAsync(this.file_path, JSON.stringify(new_data));
  }

  async deleteData(id: number): Promise<boolean> {
    await this.modifyData(id, { exists: false });
    this._showJSON();
    return true;
  }

  //debug============================================================

  async _deleteAll(): Promise<void> {
    const all_file_name = await FS.readDirectoryAsync(`${FS.documentDirectory}`)

    for (const file_name of all_file_name) {
      await FS.deleteAsync(`${FS.documentDirectory}${file_name}`)
      console.log(`delete ${file_name}`)
    }
    //await FS.deleteAsync(this.file_path);

    console.log(all_file_name)
  }


  async _showJSON(): Promise<void> {
    const data = JSON.parse(await FS.readAsStringAsync(this.file_path));
    console.log(data);
  }


  async _showInfo(path: string): Promise<void> {
    console.log(await FS.getInfoAsync(path));
  }

}

export class FSCard extends multipleFS {
  readonly save_file_path: string = `${FS.documentDirectory}cards`;

  override async initialize(): Promise<void> {
    const dirInfo = await FS.getInfoAsync(this.save_file_path);
    if (!dirInfo.exists)
      await FS.makeDirectoryAsync(this.save_file_path, { intermediates: true });

    if (!(await FS.getInfoAsync(this.file_path)).exists) {
      const result: string[] = (await axios.get('http://27.133.132.254/setup')).data;
      const data: folder_type[] = require('../../default_card_folders.json')

      this._init = await Promise.all(result.map(async (url, index) => {
        const name = url.split('/')[3].split('.')[0];
        const imagePath: string = `${this.save_file_path}/${name}${new Date().toISOString().replace(/:/g, '')}.jpg`;

        return ({
          id: index,
          name: name,
          uri: (await downloadAsync('http://27.133.132.254/' + encodeURI(url), `${this.save_file_path}${index}.jpg`)).uri,
          count: 0,
          createdDate: '',
          isDefault: true,
          exists: true,
        })

      }))

      // var previous: string = '';
      // var count = -1;
      // var i = 0;
      // for (var url of result) {
      //   const category = url.split('/')[2];
      //   //console.log(url);
      //   //console.log(category);

      //   if (previous != category) count += 1;
      //   if (data[count]) data[count].cards_ids.push(i);

      //   previous = category;

      //   i++;
      // }
      // //await FS.writeAsStringAsync(`${FS.documentDirectory}folders.json`, JSON.stringify(data));
      // console.log(data)

    }

    await super.initialize();
  }


  constructor() {
    super(`${FS.documentDirectory}card_data.json`);
    this._init = []
  }

  async savePicture(picture: string, title: string): Promise<string> {
    if (!title) {
      console.log('no title');
      title = 'なまえがないよ';
      // return '';
    }

    const imagePath: string = `${this.save_file_path}/${new Date().toISOString().replace(/:/g, '')}.jpg`;

    //save image
    if (!(await FS.getInfoAsync(this.save_file_path)).exists) {
      await FS.makeDirectoryAsync(this.save_file_path);
      console.log('create data directory');
    }

    const resized_image = await manipulateAsync(
      picture,
      [],
      { compress: 0.4, format: SaveFormat.JPEG }
    )

    await FS.copyAsync({
      from: resized_image.uri,
      to: imagePath,
    });

    //add new image info to json data
    const card_data = await this.readData<card_detail>();
    card_data.push({
      id: card_data.length,
      name: title,
      uri: imagePath,
      count: 0,
      createdDate: new Date().toISOString(),
      isDefault: false,
      exists: true,
    });
    FS.writeAsStringAsync(this.file_path, JSON.stringify(card_data));

    //console.log(`save image from ${resized_image.uri} to ${imagePath}`)
    //this._deleteAll();
    return imagePath;
  }
}

export class FSSetting {
  readonly setting_file_path = `${FS.documentDirectory}settings.json`;
  init_data: setting_contents = {
    vol: 10,
  }


  async getSettings(): Promise<setting_contents> {
    if (!(await FS.getInfoAsync(this.setting_file_path)).exists) {
      FS.writeAsStringAsync(this.setting_file_path, JSON.stringify(this.init_data));
      console.log('create data file');
    }
    const setting_data = JSON.parse(await FS.readAsStringAsync(this.setting_file_path));

    return setting_data
  }


  async setSettings(setting_data: setting_contents): Promise<boolean> {
    FS.writeAsStringAsync(this.setting_file_path, JSON.stringify(setting_data));
    return true
  }


  async resetSettings(): Promise<setting_contents> {
    FS.writeAsStringAsync(this.setting_file_path, JSON.stringify(this.init_data));
    return this.init_data
  }
}

export class FSAddress extends multipleFS {
  constructor() {
    super(`${FS.documentDirectory}address.json`);
  }
}

export class FSTemplate extends multipleFS {
  readonly MAX_TEMPLATE_NUM: number = 20;
  constructor() {
    super(`${FS.documentDirectory}temlpate.json`)
    this._init = Array(this.MAX_TEMPLATE_NUM);
    for (var i = 0; i < this.MAX_TEMPLATE_NUM; i++) {
      this._init[i] = {
        id: i,
        name: '会話' + (i + 1).toString(),
        item_num: 0,
        item_ids: Array(ws_max_card).fill(-1),
        background_color: 'white',
        exists: true,
      }
    }
  }

  async addEmpty(): Promise<void> {
    const data = await this.readData<template_cards>();
    const len = data.length;
    const empty_data: template_cards = {
      id: len,
      name: '会話' + String(len),
      item_num: 0,
      item_ids: Array(ws_max_card).fill(-1),
      background_color: 'white',
      exists: true,
    }
    data.push(empty_data);
    await this.updateData(data);
  }
}
