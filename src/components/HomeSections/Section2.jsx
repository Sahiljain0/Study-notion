import React from "react";
import Banner from "../../assets/Images/banner.mp4";
// import Banner from "../assets/Images/banner.mp4";

const Section2 = () => {
 return (
    <>
      {/* Video */}
      <div className="mx-3 my-7 lg:w-2/3 w-full shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
    </>
 )
}
export default Section2;