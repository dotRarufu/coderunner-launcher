import PocketBase from 'pocketbase';

const url = 'https://coderunner.pockethost.io';
export const client = new PocketBase(url);

// todo: turned off, becausae of duplicate renders in dev mode
client.autoCancellation(false);
