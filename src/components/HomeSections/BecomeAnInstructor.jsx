import React from "react";
import Image from "../../assets/Images/Instructor.png";
import HighLightText from "../core/HomePage/HighLightText";
import CTAButton from "../core/HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
const BecomeAnInsructor = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full px-4 md:px-20 items-center  justify-center gap-10 mt-4 md:mt-16">
        <div className="flex  w-full md:w-[50%] p-4 md:p-20 items-center justify-center">
          <img
            src={Image}
            alt="Instructor image"
            className="shadow-2xl shadow-blue-100 "
          />
        </div>
        <div className="flex flex-col px-4 gap-5 items-start w-full md:w-[50%]">
          <div className="flex flex-col font-bold text-4xl">
            <p>Become an</p>
            <p>
              <HighLightText text={"Instructor"} />
            </p>
          </div>
          <div className="flex items-start w-[80%]">
            <p className="text-richblack-300 text-md">
              Instructor from around the world teach millions of students on
              STudyNotion . we provide the toos and skills to teach what you
              love.
            </p>
          </div>
          <div className="flex mt-7">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-4">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeAnInsructor;
