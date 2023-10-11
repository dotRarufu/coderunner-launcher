import path from 'path';
import { deleteFiles } from './deleteFiles';

export const deleteSaveData = (inBuild?: boolean) => {
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

  deleteFiles(saveFolder);

  console.log('delete save data finished');
};
