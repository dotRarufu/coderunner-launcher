import { createContext } from 'react';
import { UsersResponse } from '../../pocketbase-types';

export type UserState = {
  user: UsersResponse | null;

  setShouldGetUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<UserState | null>(null);
