import { pb } from '../lib/pocketbase';

const Home = () => {
  const handleLogoutClick = () => {
    pb.authStore.clear();
  };

  return (
    <div>
      You arei nhome
      <button className="btn btn-primary" onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
};

export default Home;
