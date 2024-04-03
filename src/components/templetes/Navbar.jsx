import React, { useRef } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/reducers/AuthSlice";
import authService from "../../appwrite/Auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { loginStatus } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const profileRef = useRef(null);

  const logoutHandler = () => {
    authService.logout().then((res) => {
      toast.success("Logout Successfully");
      dispatch(logout());
    });
  };

  return (
    <nav className="w-full px-2 py-3 flex items-center justify-between border-b ">
      <h1 className="text-2xl font-bold ">logo.</h1>
      <div className="w-80">
        <SearchBar />
      </div>
      <div className="flex items-center gap-5">
        <div
          onClick={() => {
            profileRef.current.classList.toggle("hidden");
          }}
          className="profile w-10 h-10 rounded-full hover:bg-zinc-400 flex items-center justify-center text-3xl duration-200 cursor-pointer relative"
        >
          <FaUserCircle />
        </div>
        <div
          ref={profileRef}
          className="hidden max-w-80 p-3 fixed right-0 top-[10vh] bg-white shadow-xl"
        >
          {loginStatus ? (
            <div className="flex justify-around gap-5">
              <button
                onClick={logoutHandler}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 border rounded-md active:scale-90 duration-200 transition-all"
              >
                Logout
              </button>
              <Link
                to="/add"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 border rounded-md active:scale-90 duration-200 transition-all"
              >
                Add product
              </Link>
            </div>
          ) : (
            <div className="flex justify-around gap-5">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 border rounded-md active:scale-90 duration-200 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-green-400 border rounded-md active:scale-90 duration-200 transition-all"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/cart"
          className="w-10 h-10 rounded-full hover:bg-zinc-400 flex items-center justify-center text-2xl duration-200 cursor-pointer relative"
        >
          <FaShoppingCart />
          {cart.items.length > 0 && (
            <>
              <span className="p-1 bg-red-500 rounded-full animate-[ping_1s_ease_infinite] absolute top-0.5 right-0.5"></span>
              <span className="p-1 bg-red-500 rounded-full  absolute top-0.5 right-0.5"></span>
            </>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
