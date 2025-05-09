"use client";

import { HiOutlineEnvelope } from "react-icons/hi2";
import { MdNotificationsNone } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      {/* Search */}
      <div className="hidden md:flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 w-[280px]">
        <svg width="16" height="16" fill="none" stroke="currentColor" className="text-gray-500">
          <circle cx="7" cy="7" r="5" strokeWidth="2" />
          <line x1="11" y1="11" x2="15" y2="15" strokeWidth="2" />
        </svg>
        <input
          type="text"
          placeholder="Szukaj pracownika, działu..."
          className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">
        {/* Messages */}
        <div className="relative flex items-center justify-center w-9 h-9 bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer shadow-sm transition">
          <HiOutlineEnvelope className="text-[20px] text-gray-700" />
        </div>

        {/* Notifications */}
        <div className="relative flex items-center justify-center w-9 h-9 bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer shadow-sm transition">
          <MdNotificationsNone className="text-[22px] text-gray-700" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-md">
            1
          </div>
        </div>

        {/* User Info */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-semibold text-gray-800">Jan Olbert</span>
          <span className="text-xs text-gray-500">Kierownik Projektu</span>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10">
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;