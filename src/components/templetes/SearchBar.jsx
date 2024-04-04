import React, { useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { productsData } = useSelector((state) => state.products);
  const [filterProducts, setFilterProducts] = useState([]);
  const resultContainerRef = useRef(null);

  const Submithandler = (e) => {
    e.preventDefault();
  };

  const changeHandler = (e) => {
    if (e.target.value == "") {
      resultContainerRef.current.classList.add("hidden");
      setFilterProducts([]);
      return;
    }
    resultContainerRef.current.classList.remove("hidden");
    const filteredData = productsData.filter((product) =>
      product.title.includes(e.target.value)
    );
    setFilterProducts(filteredData);
  };

  const containerHide = () => {
    resultContainerRef.current.classList.add("hidden");
  };

  return (
    <div>
      <form
        onSubmit={Submithandler}
        autoComplete="off"
        className="searchBar w-full border-2 flex items-center justify-between px-3 rounded-full overflow-hidden "
      >
        <input
          type="text"
          name="search"
          id="search"
          className="w-full px-2 py-3 bg-transparent outline-none border-none"
          onChange={changeHandler}
        />
        <button type="submit" className="text-2xl pl-2">
          <RiSearch2Line />
        </button>
      </form>
      <div
        ref={resultContainerRef}
        onClick={containerHide}
        className="hidden w-screen h-[calc(100vh-10vh)] bg-black/20 fixed z-40 top-[10vh] left-1/2 -translate-x-1/2 "
      >
        <div className="max-w-[460px] w-full mx-auto">
          {filterProducts.map((item, idx) => (
            <Link
              key={idx}
              to={`/details/${item.$id}`}
              className="block bg-white first:border-t border-b hover:bg-zinc-200"
            >
              <div className=" w-full px-4 py-2 ">
                <h1 className="text-md font-medium">
                  {item.title.split("").length > 50
                    ? item.title.slice(0, 50) + "..."
                    : item.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
