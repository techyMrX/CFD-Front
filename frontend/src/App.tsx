import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Identify from './pages/Identify';
import Emergency from './pages/Emergency';
import Contacts from './pages/Contacts';
import Login from './pages/Login';
import { AuthProvider } from './contexts/AuthContext.tsx';
import PolicePanel from './pages/PolicePanel';
import PublicIdentify from './pages/PublicIdentify';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import ViewCriminals from './pages/ViewCriminals';
import EmergencyContacts from './pages/EmergencyContacts';
import UserManagement from './pages/UserManagement';
import SystemSettings from './pages/SystemSettings';
import UserDetails from './pages/UserDetails';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/identify" element={<Identify />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/police/add-criminal" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <PolicePanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/public/identify" 
              element={
                <ProtectedRoute requiredRole="user">
                  <PublicIdentify />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/view-criminals" 
              element={
                <ProtectedRoute>
                  <ViewCriminals />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/emergency-contacts" 
              element={
                <ProtectedRoute>
                  <EmergencyContacts />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user-management" 
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/system-settings" 
              element={
                <ProtectedRoute>
                  <SystemSettings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user/:id" 
              element={
                <ProtectedRoute>
                  <UserDetails />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;