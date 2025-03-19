import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate();
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-800">
                TeleCure
              </span>
            </div>
            <div className="hidden md:flex md:items-center md:ml-6">
              <NavLink
                to="/"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Home
              </NavLink>
              <NavLink
                to="/doctorlist"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Doctors
              </NavLink>
              <NavLink
                to="/about"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                About Us
              </NavLink>
              <NavLink
                to="/pricing"
                className="px-3 py-2 text-gray-700 hover:text-blue-600"
              >
                Pricing
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <NavLink
              to="login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Login
            </NavLink>
            <NavLink
              to="signup"
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Sign Up
            </NavLink>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" className="block px-3 py-2 text-gray-700">
              Home
            </NavLink>
            <NavLink to="/doctorlist" className="block px-3 py-2 text-gray-700">
              Doctors
            </NavLink>
            <NavLink to="/about" className="block px-3 py-2 text-gray-700">
              About Us
            </NavLink>
            <NavLink to="pricing" className="block px-3 py-2 text-gray-700">
              Pricing
            </NavLink>
            <div className="border-t mt-2 pt-2">
              <NavLink
                to="/signup"
                className="block w-full px-3 py-2 text-left text-gray-700"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="block w-full mt-1 px-3 py-2 text-left text-blue-600"
              >
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
