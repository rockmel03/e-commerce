import React from "react";
import Layout from "./Layout";

const Footer = () => {
  return (
    <footer class="bg-gray-800 text-gray-300 py-8">
      <div class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div class="mb-4 md:mb-0">
          <h3 class="text-xl font-bold">Logo.</h3>
          <p class="mt-2">123 Street Name, City, Country</p>
          <p>contact@company.com</p>
        </div>
        <div class="flex justify-center space-x-6">
          <a href="#" class="hover:text-white">
            About
          </a>
          <a href="#" class="hover:text-white">
            Products
          </a>
          <a href="#" class="hover:text-white">
            Contact
          </a>
        </div>
        <div class="flex justify-center space-x-6">
          <a href="#" class="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" class="hover:text-white">
            Terms of Service
          </a>
        </div>
      </div>
      <div class="bg-gray-700 py-4 text-center text-sm">
        <div class="container mx-auto">
          <p>
            &copy; 2024 Copyright. All rights reserved. | Made with{" "}
            <span class="text-red-600">&hearts;</span> by Rockmel03
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
