import { UserContext } from '../contexts/UserContext';
import { pb } from '../lib/pocketbase';
import { useContext, useEffect } from 'react';

const { api } = window;

const Home = () => {
  const { user, setShouldGetUser } = useContext(UserContext)!;

  const handleLogoutClick = () => {
    pb.authStore.clear();
    api.deleteSave();
  };

  const handleStartClick = () => {
    api.startGame(user.id);
  };

  useEffect(() => {
    api.loadGame(user.id);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full ">
      <div className="flex flex-col gap-4">
        <span>
          Welcome, <span className="font-bold">{user.name}</span>
        </span>
        <button className="btn btn-primary" onClick={handleStartClick}>
          Start Game
        </button>
      </div>
      <button
        className="btn btn-ghost hover:btn-error"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
