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
    <div>
      You arei nhome
      <button className="btn btn-primary" onClick={handleLogoutClick}>
        Logout
      </button>
      <button className="btn btn-primary" onClick={handleStartClick}>
        Start Game
      </button>
    </div>
  );
};

export default Home;
