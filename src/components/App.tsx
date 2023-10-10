import { useState } from 'react';

import { Toaster, toast } from 'react-hot-toast';
import { getUser, loginUser, signUpUser } from '../services/auth';
import { PocketbaseError } from '../types/PocketbaseError';
import { UsersResponse } from '../../pocketbase-types';
import { pb } from '../lib/pocketbase';
import useUser from '../hooks/useUser';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from '../pages/unauthorized/unauthorized';
import Home from '../pages/Home';

const App = () => {
  const { user, setShouldGetUser } = useUser();

  return (
    <UserContext.Provider value={{ user, setShouldGetUser }}>
      <Toaster />
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route
          path="home"
          element={
            <ProtectedRoute
              redirectPath={'/login'}
              isAllowed={!!user}
              children={<Home />}
            />
          }
        ></Route>

        <Route path="unauthorized" element={<Unauthorized />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
