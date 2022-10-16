import * as FS from 'expo-file-system';

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


    if (!(await FS.getInfoAsync(this.dataPath)).exists) {
      FS.writeAsStringAsync(this.dataPath, '[]');
      console.log('create data file');
    }

    const card_data = JSON.parse(await FS.readAsStringAsync(this.dataPath));
    card_data.push({
      id: card_data.length,
      name: title,
      uri: imagePath,
      createdDate: new Date().toISOString(),
      exsits: true,
    });
    FS.writeAsStringAsync(this.dataPath, JSON.stringify(card_data));

    return imagePath;
  }


  async getCardData(id: any): Promise<Array<any>> {
    const data = JSON.parse(await FS.readAsStringAsync(this.dataPath));

    if (typeof id == undefined) return data;
    else if (typeof id == 'number') return data.id[id];

    return [];
  }

  async modifyCardData(reject_data: object): Promise<boolean> {
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