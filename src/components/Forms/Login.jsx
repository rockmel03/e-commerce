import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/Auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/AuthSlice";
const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitForm = (data) => {
    authService
      .login(data)
      .then((res) => {
        dispatch(login(res));
        toast.success("login success");
        reset();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("login failed error: " + err.message);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="p-10 w-full rounded flex flex-col gap-2 shadow-2xl"
    >
      <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
      <InputField
        label="Email"
        {...register("email")}
        className="bg-trasparent shadow-xl"
        placeholder="Enter Email Address "
        autoComplete="Email"
        required
      />
      <InputField
        label="Password"
        {...register("password")}
        type="password"
        className="bg-trasparent shadow-xl"
        placeholder="Enter Password"
        autoComplete="current-password"
        required
      />
      <p className="text-blue-500">Forgot Password?</p>
      <button
        type="submit"
        className="bg-blue-500
      text-white px-4 py-2 rounded-md"
      >
        Login
      </button>
      <p className="text-center">
        Don't have any account?&nbsp;
        <span className="text-blue-800 ">
          <Link to="/signup">Create Account</Link>
        </span>
      </p>
    </form>
  );
};

export default Login;
