import { useContext, useEffect, useState } from 'react';

import { loginUser, signUpUser } from '../services/auth';
import { toast } from 'react-hot-toast';
import { PocketbaseError } from '../types/PocketbaseError';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import useLoader from '../hooks/useLoader';
import { LoaderContext } from '../contexts/LoaderContext';

const { api } = window;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { user, setShouldGetUser } = useContext(UserContext)!;
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoaderContext);

  // Automatically navigate to appropriate route
  useEffect(() => {
    if (user !== null) {
      navigate('/home');
    }
  }, [navigate, user]);

  const handleLoginClick = async () => {
    const path = api.getAssetPath(['test']);
    console.log('inBuild:', path);
    try {
      setIsLoading(true);
      await loginUser(username, password);
      // const user = getInitialAuthenticated();
      // const userData = await getUser(user.id);
      // setUser(userData);
      toast.success('Login success', {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
      setIsLoading(false);
    } catch (err) {
      toast.error('Login failed', {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold ',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full max-w-xs justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <div className="join w-full">
              <input
                type="text"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
                value={username}
                className="input input-bordered join-item w-full"
              />
              {username.length > 0 && (
                <button
                  onClick={() => setUsername('')}
                  className="join-item btn btn-error"
                >
                  X
                </button>
              )}
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="input input-bordered"
            />
          </div>
        </div>
        <button
          className="btn btn-primary max-w-xs w-full"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>

      <button
        onClick={() => navigate('/signup')}
        className="btn btn-link no-underline font-bold"
      >
        Create an account
      </button>
    </div>
  );
};

export default Login;

{
  /* <hr />
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
          value={username}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button className="btn btn-primary" onClick={handleSignupClick}>
        Sign up
      </button> */
}
