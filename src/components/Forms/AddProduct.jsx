import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import InputField from "./InputField";
import appwriteService from "../../appwrite/Config";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const { userData } = useSelector((state) => state.auth);

  const handleFormSubmit = (data) => {
    if (userData) {
      appwriteService
        .uploadFile(data.image[0])
        .then((res) => uploadData(res.$id))
        .catch((error) => console.log(error));
    }

    function uploadData(_id) {
      const newData = {
        image: _id,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        seller: userData.userId,
      };

      appwriteService
        .createProduct(newData)
        .then((res) => console.log(res))
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="rounded-md p-5 flex gap-5 justify-evenly flex-wrap bg-red-300/50"
      >
        <div className="w-[60%] flex flex-col gap-3">
          <InputField
            label="Title*"
            className="bg-trasparent shadow-xl"
            {...register("title")}
            type="text"
            id="title"
            placeholder="Enter Title"
            required
          />
          <label htmlFor="description" className="text-xl font-semibold">
            Description*
          </label>
          <textarea
            className="w-full px-2 py-3 rounded-md border-none outline-none "
            {...register("description")}
            id="description"
            rows={5}
            cols={15}
            minLength={5}
            placeholder="Enter Description"
            required
          ></textarea>
          <InputField
            label="Category*"
            className="bg-trasparent shadow-xl"
            {...register("category")}
            type="text"
            placeholder="Enter category"
            required
          />
        </div>
        <div className="w-80 flex flex-col gap-3">
          <InputField
            label="Price*"
            className="bg-trasparent shadow-xl"
            {...register("price")}
            type="number"
            id="price"
            placeholder="Enter price"
            required
          />
          <InputField
            label="Image*"
            className="bg-trasparent shadow-xl"
            {...register("image")}
            type="file"
            id="image"
            placeholder="Enter file"
            required
          />

          <button
            type="submit"
            className="bg-blue-500
      text-white px-4 py-2 rounded-md"
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddProduct;
