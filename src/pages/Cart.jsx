import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import appwriteService from "../appwrite/Config";
import { removeCartItem, updateCartItem } from "../store/reducers/CartSlice";
import { useNavigate } from "react-router-dom";

const CartItemCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const cartItem = cart.items.find((item) => item.itemId === data.$id);
  const cartItemIndex = cart.items.findIndex(
    (item) => item.itemId === data.$id
  );
  const [itemquantity, setItemQuantity] = useState(
    cartItem && cartItem.quantity
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState("");
  if (!image) {
    appwriteService
      .getImagePreview(data.image)
      .then((res) => setImage(res.href));
  }

  const increaseQuantity = () => {
    let qntty = itemquantity + 1;
    setItemQuantity(qntty);
    dispatch(
      updateCartItem({
        index: cartItemIndex,
        value: { ...cartItem, quantity: qntty },
      })
    );
  };

  const decreaseQuantity = () => {
    let qntty = itemquantity === 1 ? 1 : itemquantity - 1;
    setItemQuantity(qntty);
    dispatch(
      updateCartItem({
        index: cartItemIndex,
        value: { ...cartItem, quantity: qntty },
      })
    );
  };

  const removeHandler = () => {
    dispatch(removeCartItem(data.$id));
  };

  return (
    <article className="w-full bg-white p-5 rounded-md flex justify-between border-b first:border-t ">
      <div className="flex-1 flex gap-10">
        <div className="w-[25%] aspect-[3/2] bg-white rounded overflow-hidden">
          <img src={image} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
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
      </div>
      <div className="w-[20%]  text-right ">
        <h2 className="text-xl font-medium">Price: ${data.price}</h2>
      </div>
    </article>
  );
};

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { productsData } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const [filterProducts, setFilterProducts] = useState([]);
  const _subTotal = filterProducts
    .map((product) => {
      const item = cart.items.find((item) => item.itemId === product.$id);
      return item ? item.quantity * product.price : 0;
    })
    .reduce((acc, price) => acc + price, 0);

  useEffect(() => {
    const _filterProducts = cart.items
      .map((citem) =>
        productsData.find((product) => product.$id == citem.itemId)
      )
      .filter(Boolean); // Filter out undefined values
    setFilterProducts(_filterProducts);
  }, [productsData, cart]);

  return (
    <main className="min-h-[50vh] bg-zinc-100 relative">
      {filterProducts.length > 0 ? (
        <Layout className="flex items-start justify-center gap-5 relative">
          <div className="flex-1 bg-white">
            <div className="border-b p-5">
              <h1 className="text-3xl font-medium ">Shopping Cart</h1>
              <h1 className="text-md font-medium text-right ">Price</h1>
            </div>
            {filterProducts.map((product, idx) => (
              <CartItemCard data={product} key={product.$id} />
            ))}
          </div>
          <div className="w-80 bg-white flex flex-col gap-3 p-5 rounded-md">
            <h2 className="text-xl font-medium">
              Subtotal(<span>{filterProducts.length}</span> items): ${" "}
              <span className="font-semibold">{_subTotal.toFixed(2)}</span>
            </h2>

            <button className="w-full text-lg font-medium px-4 py-2 rounded-full text-black bg-yellow-500 border-none outline-none">
              Proceed to Buy
            </button>
          </div>
        </Layout>
      ) : (
        <div className="p-2 flex flex-col items-center justify-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-center text-lg font-medium">
            Your Cart is Empty
          </h1>
          <button
            className="px-4 py-2 bg-yellow-400 rounded-full text-sm font-semibold"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </button>
        </div>
      )}
    </main>
  );
};

export default Cart;
