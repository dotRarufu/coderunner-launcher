import path from 'path';
import { deleteFiles } from './deleteFiles';

export const deleteSaveData = () => {
  console.log('delete save data runs');
  const saveFolder = path.join(process.cwd(), 'game', 'save');

  deleteFiles(saveFolder);

  console.log('delete save data finished');
};
