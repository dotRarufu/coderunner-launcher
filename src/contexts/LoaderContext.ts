import { createContext } from 'react';

export type LoaderState = {
  isLoading: boolean;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoaderContext = createContext<LoaderState | null>(null);
