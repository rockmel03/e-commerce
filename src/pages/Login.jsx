import React from "react";
import Layout from "../components/Layout";
import { Login as LoginForm } from "../components";

const Login = () => {
  return (
    <div>
      <Layout>
        <h1>Login</h1>
        <div className="max-w-[28rem] mx-auto">
          <LoginForm />
        </div>
      </Layout>
    </div>
  );
};

export default Login;
