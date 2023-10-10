import PocketBase from 'pocketbase';

const url = 'https://coderunner.pockethost.io';
export const pb = new PocketBase(url);

// todo: turned off, becausae of duplicate renders in dev mode
pb.autoCancellation(false);
