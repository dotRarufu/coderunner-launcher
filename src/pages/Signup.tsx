import { useContext, useState } from 'react';
import { signUpUser } from '../services/auth';
import { toast } from 'react-hot-toast';
import { PocketbaseError } from '../types/PocketbaseError';
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '../contexts/LoaderContext';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { setIsLoading } = useContext(LoaderContext);
  const navigate = useNavigate();

  const handleSignupClick = async () => {
    try {
      setIsLoading(true);
      await signUpUser(name, username, password);

      toast.success('Register success', {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
      setIsLoading(false);
      navigate('/login');
    } catch (err) {
      const error = err as PocketbaseError;
      toast.error(error.message, {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
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
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              onChange={e => setName(e.target.value)}
              value={name}
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              onChange={e => setUsername(e.target.value)}
              value={username}
              className="input input-bordered"
            />
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
          onClick={handleSignupClick}
        >
          Sign Up
        </button>
      </div>

      <button
        onClick={() => navigate('/login')}
        className="btn btn-link no-underline"
      >
        Login
      </button>
    </div>
  );
};

export default SignUp;
