import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import appwriteService from "../appwrite/Config";
import { removeCartItem } from "../store/reducers/CartSlice";

const CartItemCard = ({ data, quantity }) => {
  const [itemquantity, setItemQuantity] = useState(quantity);
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  if (!image) {
    appwriteService
      .getImagePreview(data.image)
      .then((res) => setImage(res.href));
  }

  const increaseQuantity = () => {
    setItemQuantity((prev) => prev + 1);
  };
  
  const decreaseQuantity = () => {
    setItemQuantity((prev) => (prev == 0 ? 0 : (prev = prev - 1)));
  };

  const removeHandler = () => {
    dispatch(removeCartItem(data.$id));
  };

  return (
    <article className="w-full bg-zinc-200 p-5 rounded-md flex gap-10 mb-3">
      <div className="w-[18%] aspect-square bg-white rounded overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{data.title}</h1>
        <h2 className="text-xl font-medium">Price: ${data.price}</h2>
        <div className="flex items-center justify-start gap-3">
          <button
            onClick={decreaseQuantity}
            className="text-lg px-2 py-2 bg-zinc-100 rounded"
          >
            <FaMinus />
          </button>
          <h2 className="text-md w-10 px-2 py-2 bg-zinc-100 rounded border-none outline-none text-center">
            {itemquantity}
          </h2>
          <button
            onClick={increaseQuantity}
            className="text-lg px-2 py-2 bg-zinc-100 rounded"
          >
            <FaPlus />
          </button>
        </div>
        <button
          onClick={removeHandler}
          className="w-fit text-sm font-semibold px-2 py-1 rounded text-white bg-red-500"
        >
          Remove
        </button>
      </div>
    </article>
  );
};

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { productsData } = useSelector((state) => state.products);

  const [filterProducts, setFilterProducts] = useState([]);

  useEffect(() => {
    const _filterProducts = cart.items
      .map((citem) =>
        productsData.find((product) => product.$id == citem.itemId)
      )
      .filter(Boolean); // Filter out undefined values
    setFilterProducts(_filterProducts);
  }, [productsData, cart]);

  return (
    <main className="min-h-[50vh]">
      {filterProducts.length > 0 ? (
        <Layout className="flex gap-5">
          <div className="w-[70%]">
            {filterProducts.map((product, idx) => (
              <CartItemCard
                data={product}
                quantity={cart.items[idx]?.quantity}
                key={product.$id}
              />
            ))}
          </div>
          <div className="w-[30%] bg-zinc-200"></div>
        </Layout>
      ) : (
        <h1 className="text-center text-lg font-medium">Empty Cart</h1>
      )}
    </main>
  );
};

export default Cart;
