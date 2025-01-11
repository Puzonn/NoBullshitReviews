"use client";

import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="px-5 flex flex-col gap-5 h-full pt-5 bg-reviewinfobglight shadow-[0_2px_4px_rgba(255,255,255,0.04),_0_8px_16px_rgba(0,0,0,0.6)]">
      <span className="font-semibold text-2xl">No Bullshit Reviews</span>
      <div className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center">
        <Image width={24} height={24} alt="home" src="/assets/icons/home.png" />
        Home
      </div>
      <div className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center">
        <Image
          width={24}
          height={24}
          alt="home"
          src="/assets/icons/gamepad.png"
        />
        Games
      </div>
      <div className="hover:bg-reviewinfobg p-2 rounded cursor-pointer flex gap-3 items-center">
        <Image
          width={24}
          height={24}
          alt="home"
          src="/assets/icons/video.png"
        />
        Movies
      </div>

      <div className="relative mx-auto flex items-center">
        <input
          className="w-full bg-transparent text-white placeholder:text-gray-300text-sm border
                   border-slate-200 rounded-md pl-2 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400
                   focus:text-white
                    hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search Reviews"
        />
      </div>
      <div className="mt-auto pb-5 flex flex-col gap-5 justify-between">
        <div>
          <hr className="border border-white" />
        </div>
        <div className="flex justify-between">
          <button className="border border-white text-white hover:bg-reviewinfobg py-1 px-5 rounded font-medium">
            Register
          </button>
          <button className="border border-white text-white hover:bg-reviewinfobg py-1 px-5 rounded font-medium">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
