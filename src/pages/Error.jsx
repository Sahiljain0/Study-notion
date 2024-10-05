import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div class="flex flex-col bg-gray-50 items-center justify-center h-screen">
      <h1 class="text-4xl font-bold mb-4 text-white">404 - Not Found</h1>
      <p class="text-gray-600 text-white">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <div className="flex mt-6 justify-center items-center flex-col gap-3">
        <Link to="/">
          <button className="bg-[#365CCE] py-3 rounded px-6 text-white font-medium text-xs  uppercase shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none active:shadow-lg">
            Back to Home page
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
