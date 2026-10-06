import { FaRegUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../utils/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
      <Link to="/">
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer tracking-tight">
          <span className="text-red-600">NET</span>
          <span className="text-red-600">FLIX</span>
        </h1>
      </Link>

      {user?.email ? (
        <div className="flex items-center">
          <Link to="/account">
            <button className="text-neutral-300 text-4xl pr-4 transition-colors duration-300 hover:text-red-600">
              <FaRegUserCircle className="text-neutral-300 hover:text-red-600" />
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-5 py-2 rounded cursor-pointer font-semibold text-lg text-neutral-50 hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button className="text-neutral-300 text-xl pr-4 font-semibold hover:text-red-600">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-5 py-2 rounded cursor-pointer font-semibold text-lg text-neutral-50 hover:bg-red-700 transition-colors duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
