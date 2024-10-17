import React from "react";
import Banner from "../../assets/Images/banner.mp4";
// import Banner from "../assets/Images/banner.mp4";

const Section2 = () => {
 return (
    <>
      {/* Video */}
      <div className=" flex justify-center items-center w-full px-8">
      <div className=" my-7  lg:w-2/3 w-full shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[6px_6px_rgba(255,255,255)] md:shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        </div>
    </>
 )
}
export default Section2;