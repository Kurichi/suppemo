import * as FS from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

class multipleFS {
  protected file_path: string = "";

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

  async getData<T>(id: number): Promise<T>;
  async getData<T>(): Promise<Array<T>>;
  async getData<T>(id?: number) {
    if (!(await FS.getInfoAsync(this.file_path)).exists) {
      FS.writeAsStringAsync(this.file_path, '[]');
      console.log('create data file');
    }
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

    for (const [key, value] of Object.entries(reject_data)) {
      console.log(`value: ${value}`)
      console.log(`key: ${key}`)
      data[index][key] = value
      console.log(data[index][key])
    }
    FS.writeAsStringAsync(this.file_path, JSON.stringify(data));
    return true;
  }

  async deleteData(id: number): Promise<boolean> {
    const data = await this.getData<multipleType>();
    const index = this.getIndex(data, id);

    if (index == -1) {
      console.log('存在しません')
      return false;
    }
    this._showJSON();
    data.splice(index, 1);
    FS.writeAsStringAsync(this.file_path, JSON.stringify(data));
    this._showJSON();
    return true;
  }

  //debug============================================================

  async _deleteAll(): Promise<void> {
    await FS.deleteAsync(this.file_path)
    console.log('delete')
    this._showInfo(this.file_path);
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

  constructor() {
    super(`${FS.documentDirectory}card_data.json`);
  }

  async savePicture(picture: string, title: string): Promise<string> {
    if (!title) {
      console.log('no title');
      return '';
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

    // console.log('image info')
    // this._showImageInfo(picture)
    // this._showImageInfo(resized_image.uri)
    await FS.copyAsync({
      from: resized_image.uri,
      to: imagePath,
    });

    //add new image info to json data
    const card_data = await this.getData<card_detail>();
    card_data.push({
      id: card_data.length,
      name: title,
      uri: imagePath,
      count: 0,
      createdDate: new Date().toISOString(),
      exists: true,
    });
    FS.writeAsStringAsync(this.file_path, JSON.stringify(card_data));

    console.log(`save image from ${resized_image.uri} to ${imagePath}`)
    //this._deleteAll();
    return imagePath;
  }


  //debug============================================================

  async _deleteAll(): Promise<void> {
    await FS.deleteAsync(this.save_file_path)
    await FS.deleteAsync(this.file_path)
    console.log('delete')
    this._showInfo(this.save_file_path);
    this._showInfo(this.file_path);
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
  constructor() {
    super(`${FS.documentDirectory}temlpate.json`)
  }

  async initialize(): Promise<void> {
    if (!(await FS.getInfoAsync(this.file_path)).exists) {
      const _init: template_cards[] = [
        {
          id: 0,
          name: '会話１',
          item_ids: [],
          background_color: 'white',
        }
      ];

      FS.writeAsStringAsync(this.file_path, JSON.stringify(_init));
      console.log('create data file');
    }
  }
}