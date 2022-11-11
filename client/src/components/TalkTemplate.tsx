import * as FS from 'expo-file-system';


export class TalkTemplate {
  readonly dataPath: string = `${FS.documentDirectory}talk_template_data.json`
  template_list: Array<card_detail> = [];

  async init(): Promise<void> {
    if (!(await FS.getInfoAsync(this.dataPath)).exists) {
      FS.writeAsStringAsync(this.dataPath, '[]');
      console.log('create data file');
    }
    this.template_list = JSON.parse(await FS.readAsStringAsync(this.dataPath));

  }
}