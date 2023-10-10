import { UsersResponse } from '../../pocketbase-types';
import { useContext, useEffect, useState } from 'react';
import { pb } from '../lib/pocketbase';
import { loginUser, signUpUser } from '../services/auth';
import { toast } from 'react-hot-toast';
import { PocketbaseError } from '../types/PocketbaseError';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { user, setShouldGetUser } = useContext(UserContext)!;
  const navigate = useNavigate();

  // Automatically navigate to appropriate route
  useEffect(() => {
    if (user !== null) {
      navigate('/home');
    }
  }, [navigate, user]);

  const handleLoginClick = async () => {
    try {
      await loginUser(username, password);
      // const user = getInitialAuthenticated();
      // const userData = await getUser(user.id);
      // setUser(userData);
      toast.success('Login success', {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    } catch (err) {
      toast.error('Login failed', {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    }
  };

  const handleSignupClick = async () => {
    try {
      await signUpUser(email, username, password);

      toast.success('Register success', {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    } catch (err) {
      const error = err as PocketbaseError;
      toast.error(error.message, {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    }
  };

  return (
    <>
      {user && <>User: {user.username}</>}
      <div>
        <input
          type="text"
          placeholder="Username or email"
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
      <button className="btn btn-primary" onClick={handleLoginClick}>
        Login
      </button>
      <hr />
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
      </button>
    </>
  );
};

export default Login;
