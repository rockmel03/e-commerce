import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllProducts } from "./store/reducers/ProductsSlice";
import ProductDetails from "./pages/ProductDetails";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
import appwriteService from "./appwrite/Config";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteService
      .getProducts()
      .then((res) => dispatch(setAllProducts(res.documents)));
  }, []);

  return (
    <>
      <div className=" min-h-screen">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/add" element={<Add />} />
          <Route path="/details/:id/edit/:id" element={<Edit />} />
        </Routes>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}
