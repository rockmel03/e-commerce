import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "./InputField";
import appwriteService from "../../appwrite/Config";
import { toast } from "react-toastify";
import { addProduct, deleteProduct } from "../../store/reducers/ProductsSlice";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const { productsData } = useSelector((state) => state.products);

  const _product = productsData.find((p) => p.$id == id);
  const [product, setProduct] = useState(_product);

  const inputChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const imageRef = useRef(null);

  const previewImage = (e) => {
    const fileObject = e.target.files[0];
    imageRef.current.src = fileObject ? URL.createObjectURL(fileObject) : "";
    imageRef.current.alt = fileObject
      ? fileObject.name
      : "choose image to preview";
  };

  const handleFormSubmit = (data) => {
    if (!userData) {
      navigate("/login");
      toast("Please login first");
      return;
    }

    if (data.title.length == 0) return toast.error("Please Enter title");
    if (data.description.length == 0)
      return toast.error("Please Enter description");
    if (data.category.length == 0) return toast.error("Please Enter category");
    if (data.price.length == 0) return toast.error("Please Enter price");

    let editedData = {
      id,
      image: product.image,
      title: data.title,
      description: data.description,
      price: data.price,
      category: data.category,
      seller: product?.seller,
    };

    let myPromise = new Promise(async (resolve, reject) => {
      try {
        if (data.image.length > 0) {
          // // delete previous image
          const deleteImg = await appwriteService.deleteFile(product.image);
          console.log(deleteImg);
          // // upload new image
          const uploadImg = await appwriteService.uploadFile(data.image[0]);
          editedData.image = uploadImg.$id;
          console.log(uploadImg);
        }
        // // update document
        const updateDocument = await appwriteService.updateProduct(editedData);
        console.log(updateDocument);

        if (updateDocument) {
          dispatch(deleteProduct(product.$id)); // delete from store
          dispatch(addProduct(updateDocument)); // add new to store
          resolve(updateDocument);
          navigate(`/details/${updateDocument.$id}`);
        }
      } catch (error) {
        reject(error);
        throw Error(error);
      }
    });

    toast.promise(myPromise, {
      pending: "Uploading... ",
      error: "Something went wrong",
      success: "Added Successfully",
    });
  };

  useEffect(() => {
    appwriteService
      .getImagePreview(product.image)
      .then((res) => (imageRef.current.src = res.href));
  }, [product]);

  return product ? (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="rounded-md p-5 flex gap-5 justify-evenly flex-wrap"
      >
        <div className="w-[60%] flex flex-col gap-3">
          <InputField
            label="Title*"
            className="bg-transparent shadow-xl"
            {...register("title")}
            type="text"
            id="title"
            placeholder="Enter Title"
            value={product.title}
            required
          />
          <label htmlFor={id} className="text-xl font-semibold">
            Description*
          </label>
          <textarea
            className="w-full px-2 py-3 rounded-md resize-none border-none outline-none bg-transparent shadow-xl"
            {...register("description")}
            id="description"
            rows={5}
            cols={15}
            minLength={5}
            maxLength={500}
            placeholder="Enter Description"
            value={product.description}
            onChange={inputChangeHandler}
            required
          ></textarea>
          <InputField
            label="Category*"
            className="bg-transparent shadow-xl"
            {...register("category")}
            type="text"
            placeholder="Enter category"
            value={product.category}
            required
          />
        </div>
        <div className="w-80 flex flex-col gap-3">
          <InputField
            label="Price*"
            className="bg-transparent shadow-xl"
            {...register("price")}
            type="number"
            id="price"
            placeholder="Enter price"
            value={product.price}
            required
          />
          <InputField
            label="Image*"
            className="bg-transparent shadow-xl"
            {...register("image")}
            type="file"
            id="image"
            placeholder="Enter file"
            onChange={previewImage}
            // required
          />

          <div className="w-full max-h-32 aspect-square shadow-xl rounded-md">
            <img ref={imageRef} className="w-full h-full object-contain" />
          </div>

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
  ) : (
    <h1 className="text-xl text-center"> fetching Data....</h1>
  );
};

export default EditProduct;