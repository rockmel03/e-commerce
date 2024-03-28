import React from "react";

const Layout = ({ children, className }) => {
  return (
    <div className={`max-w-screen-2xl mx-auto px-10 py-10 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
