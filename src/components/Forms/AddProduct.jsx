import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputField from "./InputField";
import appwriteService from "../../appwrite/Config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../store/reducers/ProductsSlice";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (data.description.length == 0) return toast.error("Please Enter description");
    if (data.category.length == 0) return toast.error("Please Enter category");
    if (data.price.length == 0) return toast.error("Please Enter price");
    if (data.image.length == 0) return toast.error("Please upload Image");

    const newData = {
      image: null,
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      seller: userData.userId,
    };

    let myPromise = new Promise((resolve, reject) => {
      appwriteService
        .uploadFile(data.image[0])
        .then((res) =>
          appwriteService.createProduct({ ...newData, image: res.$id })
        )
        .then((result) => {
          dispatch(addProduct(result));
          resolve(result);
          navigate(`/details/${result.$id}`);
        })
        .catch((error) => {
          reject(error);
          throw Error(error);
        });
    });

    toast.promise(myPromise, {
      pending: "Uploading... ",
      error: "Something went wrong",
      success: "Added Successfully",
    });
  };

  return (
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
            required
          />
          <label htmlFor="description" className="text-xl font-semibold">
            Description*
          </label>
          <textarea
            className="w-full px-2 py-3 rounded-md resize-none border-none outline-none bg-transparent shadow-xl"
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
            className="bg-transparent shadow-xl"
            {...register("category")}
            type="text"
            placeholder="Enter category"
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
            required
          />
          <div className="w-full max-h-32 aspect-square shadow-xl rounded-md">
            <img ref={imageRef} className="w-full h-full object-contain " />
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
  );
};

export default AddProduct;

// // // this is uploading method raw lavel-1 -------------------------------------------

// const handleFormSubmit = (data) => {
//   if (!userData) {
//     navigate("/login");
//     toast("Please login first");
//     return;
//   }
//   if (userData) {
//     appwriteService
//       .uploadFile(data.image[0])
//       .then((res) => uploadData(res.$id))
//       .catch((error) => console.log(error));
//   }

//   function uploadData(_id) {
//     const newData = {
//       image: _id,
//       title: data.title,
//       description: data.description,
//       category: data.category,
//       price: data.price,
//       seller: userData.userId,
//     };

//   const myPromise =   appwriteService
//       .createProduct(newData)
//       .then((res) => {
//         dispatch(addProduct(res));
//         toast.success("added successfully");
//         navigate(`/details/${res.$id}`);
//       })
//       .catch((error) => {
//         toast.error("something went wrong");
//         console.log(error);
//       });
//   }
// };

// // // this is uploading method using async await upagraded lavel-2 --------------------------------------------------
// let handleFormSubmit = async (data) => {
//   if (!userData) {
//     navigate("/login");
//     toast("Please login first");
//     return;
//   }
//   if (!data) return;
//   const newData = {
//     image: null,
//     title: data.title,
//     description: data.description,
//     category: data.category,
//     price: data.price,
//     seller: userData.userId,
//   };

//   try {
//     const image = await appwriteService.uploadFile(data.image[0]);
//     const result = await appwriteService.createProduct({ ...newData, image: image.$id });

//     if (result) {
//       dispatch(addProduct(result));
//       navigate(`/details/${result.$id}`);
//     }
//   } catch (error) {
//     toast.error("something went wrong");
//     throw Error(error)
//   }
// };
