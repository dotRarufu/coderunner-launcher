import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import { Collections, UsersResponse } from '../../pocketbase-types';

const useUser = () => {
  // sets the initial user
  const [shouldGetUser, setShouldGetUser] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<UsersResponse | null>(
    getInitialAuthenticated()
  );

  useEffect(() => {
    const setNewUser = async () => {
      if (!shouldGetUser) return;

      const authenticated = pb.authStore.model;

      if (authenticated === null) {
        setShouldGetUser(false);
        return;
      }

      const user = await pb
        .collection(Collections.Users)
        .getOne<UsersResponse>(authenticated.id);

      // console.log('got user:', user);

      // todo: untested
      // if (!pb.authStore.isValid) {
      //   pb.authStore.clear();
      //   console.log('authStore is not valid', pb.authStore.isValid);
      //   return;
      // }

      setUser(user);
      setShouldGetUser(false);
      // navigate(user.is_admin ? '/admin' : '/staff');
    };

    void setNewUser();
  }, [navigate, shouldGetUser]);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      token;
      const authenticated = model;
      console.log('auth state changed:', authenticated);
      if (authenticated === null) {
        setUser(null);
        navigate('/login');
        return;
      }

      setShouldGetUser(true);
    });
  }, [navigate, setShouldGetUser, setUser, user]);

  return { user, setShouldGetUser };
};

export default useUser;

const getInitialAuthenticated = () => {
  // no admin account is ever logged in
  const user = pb.authStore.model as unknown as UsersResponse | null;

  return user;
};
