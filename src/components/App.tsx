import { useState } from 'react';

import { Toaster } from 'react-hot-toast';
import useUser from '../hooks/useUser';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Unauthorized from '../pages/unauthorized/unauthorized';
import Home from '../pages/Home';
import Logo from './Logo';
import SignUp from '../pages/Signup';
import { ThreeCircles } from 'react-loader-spinner';
import useLoader from '../hooks/useLoader';
import { LoaderContext } from '../contexts/LoaderContext';
import { FiX } from 'react-icons/fi';

const { api } = window;

const App = () => {
  const { user, setShouldGetUser } = useUser();
  const { isLoading, setIsLoading } = useLoader();

  const closeApp = () => {
    api.closeApp();
  };

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <UserContext.Provider value={{ user, setShouldGetUser }}>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor: '#2a323c',
              color: 'white',
            },
          }}
        />

        <div className=" absolute right-0 w-full justify-end flex pt-2 pr-2">
          <button
            onClick={() => closeApp()}
            className="text-neutral-content/50 hover:text-error"
          >
            <FiX className="w-[24px] h-[24px] aspect-square " />
          </button>
        </div>

        {isLoading && (
          <div className="absolute w-full h-full bg-black/75 flex justify-center items-center gap-4 flex-col">
            <ThreeCircles
              height="100"
              width="100"
              color="#3aa475"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
            <span>Loading</span>
          </div>
        )}
        <img
          src={`${api.getAssetPath(['assets', 'warhammer-darkened.png'])}`}
          alt="warhammers"
          className="absolute object-cover -z-[1] w-ful h-full rounded"
        />
        <div className="flex items-center py-8 flex-col h-screen gap-4 rounded">
          <Logo />
          <Routes>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route
              path="home"
              element={
                <ProtectedRoute
                  redirectPath={'/login'}
                  isAllowed={true}
                  children={<Home />}
                />
              }
            />
            <Route path="signup" element={<SignUp />} />

            <Route path="unauthorized" element={<Unauthorized />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </LoaderContext.Provider>
  );
};

export default App;
