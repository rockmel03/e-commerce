import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { RiSearch2Line } from "react-icons/ri";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <nav className="w-full px-2 py-3 flex items-center justify-between border-b ">
      <h1 className="text-2xl font-bold ">logo.</h1>
      <div className="w-80">
        <SearchBar />
      </div>
      <div className="flex items-center gap-5">
        <div className="profile w-10 h-10 rounded-full hover:bg-zinc-400 flex items-center justify-center text-3xl duration-200 cursor-pointer relative">
          <FaUserCircle />
        </div>
        <div className="w-10 h-10 rounded-full hover:bg-zinc-400 flex items-center justify-center text-2xl duration-200 cursor-pointer relative">
          <FaShoppingCart />
          <span className="p-1 bg-red-500 rounded-full animate-[ping_1s_ease_infinite] absolute top-0.5 right-0.5"></span>
          <span className="p-1 bg-red-500 rounded-full  absolute top-0.5 right-0.5"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
