import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import authService from "../../appwrite/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/AuthSlice";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = (data) => {
    console.log(data);
    authService
      .createAccount(data)
      .then((res) => {
        dispatch(login(res));
        toast.success("Account created successfully");
        reset();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Account creation failed " + err.message);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="p-10 w-full rounded flex flex-col gap-2 shadow-2xl"
      >
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <InputField
          label="Name*"
          {...register("name")}
          className="bg-trasparent shadow-xl"
          placeholder="Enter Your Name"
          autoComplete="username"
          required
        />
        <InputField
          label="Email*"
          {...register("email")}
          type="email"
          className="bg-trasparent shadow-xl"
          placeholder="Enter Email Address "
          autoComplete="email"
          required
        />
        <InputField
          label="Password*"
          {...register("password")}
          type="password"
          className="bg-trasparent shadow-xl"
          placeholder="Enter Password"
          autoComplete="new-password"
          required
        />
        <p className="text-zinc-500">
          *Password must have minimum 8 characters
        </p>
        <button
          type="submit"
          className="bg-blue-500
        text-white px-4 py-2 rounded-md"
        >
          Create Account
        </button>
        <p className="text-center">
          Allready have an account?&nbsp;
          <span className="text-blue-800 ">
            <Link to="/login">Login here</Link>
          </span>
        </p>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
