import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { IoMdStar } from "react-icons/io";
import appwriteService from "../appwrite/Config";

const ProductDetails = () => {
  const { id } = useParams();
  const { productsData } = useSelector((state) => state.products);
  const { userData } = useSelector((state) => state.auth);
  const data = productsData.find((p) => p.$id == id);

  const [image, setImage] = useState("");

  appwriteService
    .getImagePreview(data.image)
    .then((res) => setImage(res.href))
    .catch((error) => console.log(error));

  return (
    data && (
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
            <h1 className="text-4xl font-medium">{data.title}</h1>
            <div className="flex items-center gap-2">
              <h3 className="w-fit px-2 py-1 rounded text-sm font-semibold text-white bg-green-500 flex items-center">
                {data.rating?.rate}&nbsp;
                <IoMdStar />
              </h3>
              <h3 className="text-sm font-medium opacity-80">
                {data.rating?.count}{" "}
              </h3>
            </div>
            <h2 className="w-fit text-base capitalize px-3 py-0.5 font-semibold  rounded-full text-black/40 bg-zinc-300">
              {data.category}
            </h2>
            <p className="text-xl leading-[1.3]">{data.description}</p>
            <h3 className="text-2xl font-medium">Price : ${data.price} </h3>
            <div className="flex  gap-4">
              <button className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-400">
                Add to Cart
              </button>
              <button className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-500">
                Buy Now
              </button>
            </div>
            <div className="flex  gap-4">
              <Link
                to={`edit/${id}`}
                className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-400"
              >
                Edit
              </Link>
              <Link
                to=""
                className="text-md font-medium px-4 py-2 rounded text-black bg-yellow-500"
              >
                Delete
              </Link>
            </div>
          </div>
        </Layout>
      </section>
    )
  );
};

export default ProductDetails;
