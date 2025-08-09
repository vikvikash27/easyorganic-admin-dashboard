import React, { useState, useRef, useEffect } from "react";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { BellIcon, ChevronDownIcon, LogoutIcon, SearchIcon } from "../icons";

// This is the top navigation bar of the admin layout.
// It includes a search bar, notifications, and user profile dropdown.
const Header: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Search Bar */}
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>

        {/* Right side icons and user menu */}
        <div className="flex items-center space-x-4">
          <button className="relative text-slate-500 hover:text-brand-primary">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <img
                src={user?.avatar}
                alt="User avatar"
                className="h-9 w-9 rounded-full"
              />
              <div className="text-left hidden md:block">
                <span className="font-semibold text-sm text-slate-700">
                  {user?.name}
                </span>
                <span className="block text-xs text-slate-500 capitalize">
                  {user?.role}
                </span>
              </div>
              <ChevronDownIcon className="h-5 w-5 text-slate-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Settings
                </a>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogoutIcon className="h-5 w-5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
