import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user, isOpen, onClose }) => {
  return (
    <div
      className={`absolute top-0 left-0 h-full w-[50%] bg-gray-900 text-white z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300`}
    >
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <h2 className="text-xl font-bold mb-6 pb-2 border-b-2">
            Hello, {user?.fullname?.firstname || 'User'}
          </h2>
          <ul className="space-y-4">
            <li>
              <Link to="/profile" className="hover:text-white text-gray-300 text-lg">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/ride-history" className="hover:text-white text-gray-300 text-lg">
                Ride History
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-auto">
          <Link
            to="/user/logout"
            className="block w-full text-center bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 rounded-md mt-6"
          >
            Logout
          </Link>
          <button
            onClick={onClose}
            className="mt-4 text-sm text-gray-400 hover:text-white underline block mx-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
