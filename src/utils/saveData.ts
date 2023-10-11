import path from 'path';
import fs from 'fs';
import { Collections } from '../../pocketbase-types';
import { pb } from '../lib/pocketbase';

export const saveData = async (userId: string, inBuild?: boolean) => {
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

  const saveFiles = fs.readdirSync(saveFolder);

  const formData = new FormData();
  saveFiles.forEach(file => {
    const a = path.join(saveFolder, file);
    formData.append('files', new Blob([fs.readFileSync(a)]), file);
  });
  formData.append('owner', userId);

  // remove old saves
  const oldSaves = await pb
    .collection(Collections.Save)
    .getList(1, 10, { filter: `owner="${userId}"` });
  await Promise.all(
    oldSaves.items.map(async s => {
      await pb.collection(Collections.Save).delete(s.id);
    })
  );

  await pb.collection(Collections.Save).create(formData);
};
