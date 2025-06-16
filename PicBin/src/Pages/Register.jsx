import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { UserContexData } from '../context/UserContex';
import axios from 'axios';

const Register = () => {
  const { setUser } = React.useContext(UserContexData);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // console.log(`${import.meta.env.VITE_BACKEND_URL}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setError('Invalid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        formData
      );

      if (response.status === 201) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
        toast.success('Registration successful!');
        navigate('/home');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <div className="relative min-h-screen flex items-center w-full  justify-center bg-gray-100 overflow-hidden">
      {/* Background Wavy Element */}
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-br from-blue-100 to-white transform -skew-y-12 origin-top-right md:w-2/5"></div>
      <div className="absolute bottom-0 left-0 w-3/5 h-full bg-gradient-to-tl from-purple-100 to-white transform skew-y-12 origin-bottom-left md:w-2/5"></div>

      {/* Main Content Area */}
      <div className="relative bg-white p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-200 rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row z-10 mx-4 my-8">
        {/* Left Column: Form */}
        <div className="flex-1 flex flex-col justify-between w-full md:w-1/2 md:pr-8">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-xl font-bold text-gray-800">PicBin </span>
              </div>
              <nav className=" flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Join</Link>
              </nav>
            </div>

            <div className="text-left mb-8">
              <p className="text-sm text-gray-500 mb-2">START FOR FREE</p>
              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
                Create new account<span className="text-blue-600">.</span>
              </h2>
              <p className="mt-4 text-gray-600 text-sm">
                Already a Member? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Log In</Link>
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="peer w-full px-4 py-3 border border-gray-300 placeholder-transparent text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Michal"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 peer-focus:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
               
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="peer w-full px-4 py-3 border border-gray-300 placeholder-transparent text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="michal.masiak@anywhere.co"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 peer-focus:text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="peer w-full px-4 py-3 border border-gray-300 placeholder-transparent text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10"
                    placeholder="Enter a password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer text-gray-400 peer-focus:text-blue-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414L5.586 8H4a1 1 0 000 2h3.586l-2.293 2.293a1 1 0 001.414 1.414L8 11.414l2.293 2.293a1 1 0 001.414-1.414L10.414 10l2.293-2.293a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 000 1.414z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.523 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center text-sm">
               
                <button
                  type="submit"
                  disabled={loading}
                  className={`py-3 px-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Creating Account...' : 'Create account'}
                </button>
              </div>
            </form>
          </div>

          {/* Optional: Add a footer or other elements if needed */}
        </div>

        {/* Right Column: Image and Wavy Overlay */}
        <div className="hidden md:flex flex-1 items-center justify-center relative w-1/2 rounded-r-3xl overflow-hidden">
          <img
            src="https://4kwallpapers.com/images/walls/thumbs/22432.jpg"
            alt="Scenic view"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-20"></div>
          <div className="relative z-10 text-white text-center p-8">
            <h3 className="text-3xl font-extrabold mb-4">Hello There!</h3>
            <p className="text-lg">Register and start your journey with us.</p>
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Register
