import React from "react";
import Banner from "../../assets/Images/banner.mp4";
// import Banner from "../assets/Images/banner.mp4";

const Section2 = () => {
 return (
    <>
      <div className="mx-3 my-12 shadow-blue-200 w-[70%] relative">
        <div className="grad2 -top-10 w-[800px]"></div>
        <video className="video" muted loop autoPlay>
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
    </>
 )
}
export default Section2;