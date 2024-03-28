import React from "react";
import Navbar from "./templetes/Navbar";
import Layout from "./Layout";

const Header = () => {
  return (
    <header className="h-[10vh] w-full sticky top-0 z-[99] bg-white">
      <Layout className={`!py-0`}>
        <Navbar />
      </Layout>
    </header>
  );
};

export default Header;
