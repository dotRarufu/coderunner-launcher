import path from 'path';
import { pb } from '../lib/pocketbase';
import { getUserSave } from '../services/save';
import { downloadFile } from './downloadFile';

export const loadData = async (userId: string, inBuild?: boolean) => {
  try {
    const buildSaveFolder = path.join(
      process.cwd(),
      'resources',
      'app',
      'game',
      'save'
    );
    const saveFolder = inBuild
      ? buildSaveFolder
      : path.join(process.cwd(), 'game', 'save');
    const record = await getUserSave(userId);
    record.files.forEach(file => {
      const url = pb.files.getUrl(record, file);
      const saveFileName = `${file.slice(0, file.indexOf('_'))}.rmmzsave`;
      const savePath = path.join(saveFolder, saveFileName);
      downloadFile(url, savePath);
    });
  } catch (err) {
    console.log('user has no saved data');
  }
};
