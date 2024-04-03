import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import appwriteService from "../../appwrite/Config";

const ProductCard = ({ data }) => {
  const [image, setImage] = useState("");
  if (!image) {
    appwriteService
      .getImagePreview(data.image)
      .then((res) => setImage(res.href));
  }

  return (
    <div className="max-w-72 min-w-56 w-full aspect-[3/4] p-3 flex flex-col gap-2 rounded-md bg-white text-black shadow-md overflow-hidden">
      <div className="w-full h-[60%] overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-contain" />
      </div>
      <div>
        <h2 className="text-xl font-semibold leading-tight">
          {data.title.trim().split("").length > 50
            ? data.title.trim().split("").slice(0, 50).join("") + "..."
            : data.title}
        </h2>
        <h5 className="text-sm font-semibold text-black/50 bg-black/10 w-fit rounded-full px-2 capitalize leading-[1.5] my-2">
          {data.category}
        </h5>
        <h3 className="text-xl font-medium">Price: ${data.price} </h3>
        {data.rating && (
          <div className="flex gap-2 items-center mt-2">
            <h3 className="px-2 py-1 rounded text-sm font-semibold text-white bg-green-500 flex items-center">
              {data.rating?.rate && data.rating.rate}&nbsp;
              <IoMdStar />
            </h3>
            <h3 className="text-sm opacity-80">
              {data.rating?.count && data.rating.count}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
