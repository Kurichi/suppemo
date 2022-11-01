import * as FS from 'expo-file-system';


/*
  data = {
    id          : number  || 固有のID
    name        : string  || タイトルでつけた名前
    uri         : string  || 画像のパス
    createdDate : date    || 作成日
    exists     : boolean || 利用可能かどうか
  } 
*/

type card_detail = {
  id: number,
  name: string,
  uri: string,
  createdDate: string,
  exists: boolean,
}


export class FileSystem {
  readonly savePath: string = `${FS.documentDirectory}cards`;
  readonly dataPath: string = `${FS.documentDirectory}card_data.json`;

  getIndex(data: Array<card_detail>, id: number): number {
    let res = -1
    data.forEach((value, index) => {
      if (value.id == id) res = index;
    })
    return res;
  }

  async savePicture(picture: string, title: string): Promise<string> {
    if (!title) {
      console.log('no title');
      return '';
    }

    const imagePath: string = `${this.savePath}/${new Date().toISOString().replace(/:/g, '')}.jpg`;

    //save image
    if (!(await FS.getInfoAsync(this.savePath)).exists) {
      await FS.makeDirectoryAsync(this.savePath);
      console.log('create data directory');
    }
    await FS.copyAsync({
      from: picture,
      to: imagePath,
    });

    //add new image info to json data
    const card_data = await this.getCardData();
    card_data.push({
      id: card_data.length,
      name: title,
      uri: imagePath,
      createdDate: new Date().toISOString(),
      exists: true,
    });
    FS.writeAsStringAsync(this.dataPath, JSON.stringify(card_data));

    console.log(`save image from ${picture} to ${imagePath}`)
    this.deleteCard(0);
    //this._deleteAll();
    return imagePath;
  }


  async getCardData(id: number): Promise<card_detail>;
  async getCardData(): Promise<Array<card_detail>>;
  async getCardData(id?: number) {
    if (!(await FS.getInfoAsync(this.dataPath)).exists) {
      FS.writeAsStringAsync(this.dataPath, '[]');
      console.log('create data file');
    }
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));

    if (typeof id == 'number') {
      const index = this.getIndex(data, id)
      return index != -1 ? data[index] : null;
    }
    else return data;
  }


  async modifyCardData(id: number, reject_data: object): Promise<boolean> {
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));
    const index = this.getIndex(data, id);

    for (const [key, value] of Object.entries(reject_data)) {
      console.log(`value: ${value}`)
      console.log(`key: ${key}`)
      data[index][key] = value
      console.log(data[index][key])
    }
    FS.writeAsStringAsync(this.dataPath, JSON.stringify(data));
    return true;
  }


  async deleteCard(id: number): Promise<boolean> {
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));
    const index = this.getIndex(data, id);

    if (index == -1) {
      console.log('存在しません')
      return false;
    }
    this._showJSON();
    FS.deleteAsync(data[index].uri);
    data.splice(index, 1);
    FS.writeAsStringAsync(this.dataPath, JSON.stringify(data));
    this._showJSON();
    return true;
  }




  //debug============================================================

  async _deleteAll(): Promise<void> {
    await FS.deleteAsync(this.savePath)
    await FS.deleteAsync(this.dataPath)
    console.log('delete')
    this._showImageInfo(this.savePath);
    this._showImageInfo(this.dataPath);
  }


  async _showJSON(): Promise<void> {
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));
    console.log(data);
  }


  async _showImageInfo(path: string): Promise<void> {
    console.log(await FS.getInfoAsync(path));
  }
}