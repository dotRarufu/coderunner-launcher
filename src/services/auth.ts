import {
  Collections,
  UsersRecord,
  UsersResponse,
} from '../../pocketbase-types';
import { pb } from '../lib/pocketbase';

export const loginUser = async (username: string, password: string) => {
  await pb
    .collection(Collections.Users)
    .authWithPassword<UsersResponse>(username, password);
};

export const signUpUser = async (
  email: string,
  username: string,
  password: string
) => {
  const data = {
    name: email,
    username,
    password,
    passwordConfirm: password,
  };
  await pb.collection(Collections.Users).create<UsersRecord>(data);
};

export const getUser = async (id: string) => {
  const user = await pb.collection(Collections.Users).getOne<UsersResponse>(id);

  return user;
};
