import { Link } from 'react-router-dom';

const Landing = () => {
  const features = [
    {
      title: 'Easy Image Upload',
      description: 'Upload your images with just a few clicks. Support for multiple image formats.',
      icon: '📤',
    },
    {
      title: 'Secure Storage',
      description: 'Your images are stored securely in the cloud with Cloudinary integration.',
      icon: '🔒',
    },
    {
      title: 'Instant Sharing',
      description: 'Get shareable links instantly for your uploaded images.',
      icon: '🔗',
    },
    {
      title: 'User Dashboard',
      description: 'Track your uploads and manage your images from your personal dashboard.',
      icon: '📊',
    },
  ];

  const  heading = "Convert Image to URL"

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {heading} <span className="text-indigo-600">Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The easiest way to upload, store, and share your images online. Fast, secure, and reliable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/home"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium border border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose PicBin?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload</h3>
            <p className="text-gray-600">Select your image and upload it to our platform</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Process</h3>
            <p className="text-gray-600">We optimize and store your image securely</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Share</h3>
            <p className="text-gray-600">Get your shareable link instantly</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PicBin</h3>
              <p className="text-gray-400">
                The easiest way to share your images online.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/upload" className="text-gray-400 hover:text-white">
                    Upload
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">
                Have questions? Reach out to us at support@picbin.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PicBin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 