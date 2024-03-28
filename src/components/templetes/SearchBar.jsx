import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = () => {

    const Submithandler = (e) => {
        e.preventDefault()
    }

  return (
    <form onSubmit={Submithandler}
      autoComplete="off"
      className="searchBar w-full border-2 flex items-center justify-between px-3 rounded-full overflow-hidden "
    >
      <input
        type="text"
        name="search"
        id="search"
        className="w-full px-2 py-3 bg-transparent outline-none border-none"
      />
      <div className="text-2xl pl-2">
        <RiSearch2Line />
      </div>
    </form>
  );
};

export default SearchBar;
