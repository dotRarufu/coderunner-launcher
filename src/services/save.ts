import { SaveResponse, Collections } from '../../pocketbase-types';

import { pb } from '../lib/pocketbase';

export const getUserSave = async (userId: string) => {
  const res = await pb
    .collection(Collections.Save)
    .getFirstListItem<SaveResponse>(`owner="${userId}"`);

  return res;
};
