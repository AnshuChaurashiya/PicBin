import React from 'react';

const handleLogout = () => {
  // TODO: Add your logout logic here
  alert('Logged out!');
};

const AdminPage = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar (bottom nav on mobile, sidebar on desktop) */}
      <aside className="fixed bottom-0 left-0 w-full h-16 bg-white rounded-t-3xl shadow-lg flex flex-row items-center justify-between px-6 z-20 lg:static lg:w-20 lg:h-auto lg:rounded-3xl lg:m-6 lg:flex-col lg:items-center lg:py-8 lg:px-0">
        <div className="hidden lg:block text-2xl lg:text-3xl font-bold text-green-400 mb-0 lg:mb-10 mx-4 lg:mx-0">G</div>
        <nav className="flex-1 w-full">
          <ul className="flex flex-row justify-between items-center w-full h-full lg:flex-col lg:space-y-8 lg:gap-0 lg:justify-center lg:items-center">
            <li className="bg-green-100 text-green-500 rounded-xl p-2 lg:p-3"><span role="img" aria-label="dashboard">🔘</span></li>
            <li className="text-gray-400 hover:text-green-400"><span role="img" aria-label="orders">📦</span></li>
            <li className="text-gray-400 hover:text-green-400"><span role="img" aria-label="users">👤</span></li>
            <li className="text-gray-400 hover:text-green-400"><span role="img" aria-label="settings">⚙️</span></li>
            {/* Logout icon for mobile */}
            <li className="text-gray-400 hover:text-red-500 block lg:hidden">
              <button onClick={handleLogout} aria-label="Logout" className="focus:outline-none">
                <span role="img" aria-label="logout">🚪</span>
              </button>
            </li>
          </ul>
        </nav>
        {/* Profile and logout for desktop */}
        <div className="hidden lg:flex flex-col items-center mt-auto gap-4">
          <img className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-green-300" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
          <button onClick={handleLogout} aria-label="Logout" className="text-gray-400 hover:text-red-500 text-2xl focus:outline-none">
            <span role="img" aria-label="logout">🚪</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 pt-6 pb-20 lg:pt-8 lg:pb-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4 md:gap-0">
          <input type="text" placeholder="Do a voice search" className="w-full md:w-1/3 px-4 py-2 rounded-full border border-gray-200 shadow-sm focus:outline-none" />
          <div className="flex gap-2 md:gap-3">
            <button className="bg-green-100 text-green-600 px-3 md:px-4 py-2 rounded-full font-medium text-sm md:text-base">Clothing Store</button>
            <button className="bg-gray-100 text-gray-600 px-3 md:px-4 py-2 rounded-full font-medium text-sm md:text-base">Online consultations</button>
          </div>
          <div className="flex items-center gap-2 md:gap-3 bg-white px-3 md:px-4 py-2 rounded-full shadow">
            <img className="w-7 h-7 md:w-8 md:h-8 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
            <span className="font-semibold text-gray-700 text-sm md:text-base">Jimmy Pete</span>
            <span className="text-gray-400 text-xs md:text-sm">31 Aug</span>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-6 lg:grid-rows-3 gap-4 md:gap-6">
          {/* Top Row */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow flex flex-col justify-between">Total Order</div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow flex flex-col justify-between">Total Revenue</div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-2">Customer Traffic</div>

          {/* Middle Row */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow flex flex-col justify-between">Device</div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow flex flex-col justify-between">Bestselling</div>
          <div className="bg-white rounded-2xl p-0 shadow flex flex-col justify-between overflow-hidden col-span-1 sm:col-span-2 lg:col-span-2 row-span-2">
            {/* Image Card */}
            <div className="h-40 md:h-2/3 w-full bg-gray-200 flex items-center justify-center">
              <img className="object-cover h-full w-full rounded-t-2xl" src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" alt="Trendy Jeans" />
            </div>
            <div className="p-4 md:p-6">Track Sales Conversion</div>
          </div>

          {/* Buyer Location Statistics */}
          <div className="bg-green-50 rounded-2xl p-4 md:p-6 shadow flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-2">Buyer Location Statistics</div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
