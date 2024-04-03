import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import appwriteService from "../appwrite/Config";
import { toast } from "react-toastify";
import { deleteProduct } from "../store/reducers/ProductsSlice";
import { addCartItem, removeCartItem } from "../store/reducers/CartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsData } = useSelector((state) => state.products);
  const { cart } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.auth);
  const product = productsData.find((p) => p.$id == id);

  const status = Boolean(cart.items.find((val) => val?.itemId == product.$id));
  const [isAddedToCart, setisAddedToCart] = useState(status);
  const [image, setImage] = useState("");

  if (product?.image) {
    appwriteService
      .getImagePreview(product.image)
      .then((res) => setImage(res.href))
      .catch((error) => console.log(error));
  }

  const addToCartHandler = (productId) => {
    if (!isAddedToCart) {
      let cartItemObj = {
        itemId: productId,
        quantity: 1,
      };
      dispatch(addCartItem(cartItemObj));
      setisAddedToCart(true);
      toast.success("Item added successfully");
    } else {
      dispatch(removeCartItem(productId));
      setisAddedToCart(false);
      toast.success("Item removed successfully");
    }
  };

  const deleteProductHandler = () => {
    let confirmed = confirm(
      `Do You really wants to delete product: ${product.title}`
    );
    if (!confirmed) return toast.info("Cancelled Deletion");

    if (userData.userId === product.seller) {
      const myPromise = new Promise((resolve, reject) => {
        appwriteService.deleteFile(product.image);
        appwriteService
          .deleteProduct(product.$id)
          .then((res) => {
            dispatch(deleteProduct(product.$id));
            navigate("/");
            resolve();
          })
          .catch((error) => {
            console.error(error);
            reject();
          });
      });

      toast.promise(myPromise, {
        pending: "Deleting Product...",
        error: "Something went wrong",
        success: "Successfully Deleted",
      });
    }
  };

  return (
    product && (
      <section>
        <Layout className="flex justify-evenly items-start gap-10">
          <div className="w-[30%]  p-5 ">
            <img
              src={image}
              alt=""
              className="w-full h-full object-contain object-center"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-3">
            <h1 className="text-4xl font-medium">{product.title}</h1>
            {product.rating && (
              <div className="flex items-center gap-2">
                <h3 className="w-fit px-2 py-1 rounded text-sm font-semibold text-white bg-green-500 flex items-center">
                  {product.rating?.rate}&nbsp;
                  <IoMdStar />
                </h3>
                <h3 className="text-sm font-medium opacity-80">
                  {product.rating?.count}{" "}
                </h3>
              </div>
            )}
            <h2 className="w-fit text-base capitalize px-3 py-0.5 font-semibold  rounded-full text-black/40 bg-zinc-300">
              {product.category}
            </h2>
            <p className="text-xl leading-[1.3]">{product.description}</p>
            <h3 className="text-2xl font-medium">Price : ${product.price} </h3>
            <div className="flex  gap-4">
              <button
                onClick={() => addToCartHandler(product.$id)}
                className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-400"
              >
                {isAddedToCart ? "Remove from cart" : "Add to Cart"}
              </button>
              <button className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-500">
                Buy Now
              </button>
            </div>
            {userData && userData.userId === product.seller && (
              <div className="flex  gap-4">
                <Link
                  to={`edit/${id}`}
                  className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-400"
                >
                  Edit
                </Link>
                <button
                  onClick={deleteProductHandler}
                  className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </Layout>
      </section>
    )
  );
};

export default ProductDetails;
