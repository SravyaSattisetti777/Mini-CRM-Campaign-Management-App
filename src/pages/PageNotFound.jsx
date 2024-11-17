import React from 'react';

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-600 to-pink-500 flex flex-col justify-center items-center text-center">
      <h1 className="text-8xl font-extrabold text-white mb-4 drop-shadow-lg">Error 404</h1>
      <p className="text-2xl text-white mb-8">"Oops! It seems the page you're looking for is not there. Please check the url!!"</p>
      <a href="/" className="bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-800 transition duration-300 ease-in-out">
        Go Back to Home
      </a>
    </div>
  );
}

export default PageNotFound;