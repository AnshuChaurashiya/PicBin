import React from 'react';
import { FaPlay } from "react-icons/fa6";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { LuHouse } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { UserContexData } from '../context/UserContex';
import { useNavigate,useLocation } from 'react-router-dom'
import { IoImagesOutline } from "react-icons/io5";
import axios from 'axios';

function Sidebar() {
  const { user, setUser } = React.useContext(UserContexData);
  const navigate = useNavigate();
  const location = useLocation()

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call backend logout endpoint
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      
      // Clear user data from context
      setUser(null);
      
      // Remove all user-related data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the backend call fails, clear local data
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <>
    <div className="flex  flex-col bg-white  rounded-2xl shadow border-gray-300  sticky top-2  ml-1">
      <div className="w-full md:block hidden md:w-52 bg-white  rounded-3xl h-[98vh] overflow-hidden">
        {/* Profile */}
        <div className="mb-8 mt-5 flex flex-col items-center justify-center w-full">
          <img src="https://res.cloudinary.com/dbqgnaqqa/image/upload/v1749911229/user_uploads/y61vimk50etofxsizxsf.jpg" alt="Profile" className="w-h-28 h-28 rounded-full" />

          <h2 className="text-lg font-semibold text-gray-800 text-center">{user?.name || 'Guest'}</h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-3 text-gray-600 relative font-medium">
          <Link to={'/home'} className="items-center gap-3 flex group  font-semibold">
            <span className={`text-xl group-hover:bg-indigo-600 group-hover:text-white duration-500 transition-all p-2 group-hover:px-5 rounded-r-full ${location.pathname === '/home' ? "bg-indigo-600  px-5 text-white duration-500  " : "" }`}><LuHouse /></span> Home</Link>
          <Link to={'/Profile'} className=" items-center gap-3 flex group  font-semibold"> 
           <span className={`text-xl group-hover:bg-indigo-600 group-hover:text-white duration-500 transition-all p-2 group-hover:px-5 rounded-r-full ${location.pathname === "/Profile" ? "bg-indigo-600  px-5 text-white duration-500  " : ""}`}><CiUser /></span>Account</Link>
          <Link to={'/Images'} className="items-center gap-3 flex group  font-semibold"> <span className={` text-xl group-hover:bg-indigo-600 group-hover:text-white duration-500 transition-all p-2 group-hover:px-5 rounded-r-full  ${location.pathname === "/Images" ? "bg-indigo-600  px-5 text-white duration-500  " : ""}`}><IoImagesOutline /></span>Images</Link>
          <button onClick={handleLogout} className="items-center gap-3 flex group hover:text-red-500  font-semibold"> <span className=' text-xl group-hover:bg-red-600 group-hover:text-white duration-500 transition-all p-2 group-hover:px-5 rounded-r-full'><CiLogout /></span>Logout</button>
        </nav>

        {/* Now Playing */}
       <div className="">
        </div>
      </div>
    </div>

{/* mobile nav */}
    <div className="md:hidden fixed bottom-2 left-0 right-0 w-[93%] m-auto bg-white rounded-4xl border border-gray-400 shadow-lg z-50">
      <div className="w-full px-4 py-2 ">
        <nav className="flex justify-between items-center text-gray-600 font-medium">
          <Link to={'/home'} className="flex flex-col items-center gap-1">
            <span className={`text-xl p-2 hover:bg-indigo-600 hover:text-white duration-500 transition-all rounded-full ${location.pathname === '/home' ? "bg-indigo-600   text-white duration-500  " : "" }`}><LuHouse /></span>
            <span className="text-xs">Home</span>
          </Link>
          <Link to={'/Profile'} className="flex flex-col items-center gap-1">
            <span className={`text-xl p-2 hover:bg-indigo-600 hover:text-white duration-500 transition-all rounded-full ${location.pathname === '/Profile' ? "bg-indigo-600   text-white duration-500  " : "" }`}><CiUser /></span>
            <span className="text-xs">Profile</span>
          </Link>
          <Link to={'/Images'} className="flex flex-col items-center gap-1">
            <span className={`text-xl p-2 hover:bg-indigo-600 hover:text-white duration-500 transition-all rounded-full ${location.pathname === '/Images' ? "bg-indigo-600   text-white duration-500  " : "" }`}><IoImagesOutline /></span>
            <span className="text-xs">Images</span>
          </Link>
          <button onClick={handleLogout} className="flex  flex-col items-center gap-1">
            <span className='text-xl p-2 hover:bg-red-600 bg-red-500 rounded-full text-white hover:text-white duration-500 transition-all rounded-full'><CiLogout /></span>
            <span className="text-xs">Logout</span>
          </button>
        </nav>
      </div>
    </div>
    </>
  );
}

export default Sidebar;
