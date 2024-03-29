import React from "react";
import Layout from "../components/Layout";
import { Signup as SignupForm } from "../components";

const Signup = () => {
  return (
    <div>
      <Layout>
        <h1>Signup</h1>
        <div className="max-w-[28rem] mx-auto">
          <SignupForm />
        </div>
      </Layout>
    </div>
  );
};

export default Signup;
