import { useNavigate } from 'react-router-dom';

const Navbar = ({ token, logout }: { token: string | null; logout: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="bg-gray-800 p-6 flex justify-between items-center">
      <h1 className="text-white text-xl font-bold"><span className='text-blue-600'>AnalyZer</span>Pro.</h1>
      
      <div>
        {token ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
