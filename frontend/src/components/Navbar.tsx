import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';

function Navbar(): JSX.Element {
  const { user } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">SafetyNet</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/identify" className="hover:text-gray-200">
                  Identify
                </Link>
                <Link to="/emergency" className="hover:text-gray-200">
                  Emergency
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="hover:text-gray-200">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="hover:text-gray-200">
                  Profile
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 