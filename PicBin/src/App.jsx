import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Landing';
import ImageUploader from './components/ImageUploader';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import Home from './Pages/Home';
import ProctedRouts from './Pages/ProctedRouts';
import Sidebar from './components/SideBar';
import { ImageProvider } from './context/ImageContext';
import AdminPage from './Pages/Admin';
import AllImages from './Pages/AllImages';

function App() {
  // TODO: Implement proper authentication check
 const location = useLocation()
 const fullSize = location.pathname == '/login' || location.pathname === '/register' || location.pathname === '/' ;


  return (
    <ImageProvider>
      <Toaster position="top-right" />
      <div className="md:flex  bg-gradient-to-b from-indigo-50 to-white">
      {!fullSize && (
          <div className="">
            <Sidebar />
          </div>
        )}
        
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Home" element={ <ProctedRouts><Home /></ProctedRouts> } />
        <Route path="/Images" element={ <ProctedRouts><AllImages /></ProctedRouts> } />
        <Route
          path="/upload"
          element={ <ImageUploader />}
        />


        <Route
          path="/profile"
          element={
            <ProctedRouts>
              <UserProfile />
            </ProctedRouts>
          }
        />
        <Route
          path="/admin"
          element={ <AdminDashboard />}
        />
      </Routes>
      </div>
    </ImageProvider>
  );
}

export default App;
