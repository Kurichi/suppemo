import * as FS from 'expo-file-system';

type card_detail = {
  id: number,
  name: string,
  uri: string,
  createdDate: string,
  exsists: boolean,
}

export class FileSystem {
  readonly savePath: string = `${FS.documentDirectory}cards`;
  readonly dataPath: string = `${FS.documentDirectory}card_data.json`;

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
    /*
      data = {
        id          : number  || 固有のID
        name        : string  || タイトルでつけた名前
        uri         : string  || 画像のパス
        createdDate : date    || 作成日
        exsist      : boolean || 利用可能かどうか
      } 
    */


    const card_data = await this.getCardData();
    card_data.push({
      id: card_data.length,
      name: title,
      uri: imagePath,
      createdDate: new Date().toISOString(),
      exsists: true,
    });
    FS.writeAsStringAsync(this.dataPath, JSON.stringify(card_data));

    console.log(`save image from ${picture} to ${imagePath}`)
    return imagePath;
  }

  async getCardData(id: number): Promise<Array<card_detail>>;
  async getCardData(): Promise<Array<card_detail>>;

  async getCardData(id?: number): Promise<Array<card_detail>> {
    if (!(await FS.getInfoAsync(this.dataPath)).exists) {
      FS.writeAsStringAsync(this.dataPath, '[]');
      console.log('create data file');
    }

    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));

    if (typeof id == 'number') return data.id[id];
    else return data;

    return [];
  }

  async modifyCardData(id: number, reject_data: Array<object>): Promise<boolean> {
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));

    reject_data.forEach((value, key) => {
      console.log(`value: ${value}`)
      console.log(`key: ${key}`)
    });
    return true;
  }

  async _showJSON(): Promise<void> {
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));
    console.log(data);
  }

  async _showImageInfo(): Promise<void> {
    console.log(await FS.getInfoAsync(this.savePath));
  }
}