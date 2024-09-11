import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../core/HomePage/HighLightText";
import CTAButton from "../core/HomePage/Button";
const Section1 = () => {
  return (
    <>
      {/* // Section 1// */}
      <Link to="/signup">
        <div className="group p-[2px] mt-16  mx-20 rounded-full font-bold text-richblack-200  flex flex-col  bg-richblack-800  transition-all duration-500 hover:scale-95 w-fit  ">
          <div className="rounded-full group-hover:bg-richblack-900 flex flex-row px-10 py-[5px] gap-4 items-center">
            <p>Become an Instructor </p>
            <FaArrowRight />
          </div>
        </div>
      </Link>
      <div className="text-4xl font-semibold text-center mt-7">
        Empower Your Future with
        <HighLightText text={"Coding skills"} />
      </div>

      <div className=" text-center w-[90%]  mt-4 text-lg text-richblack-300 font-bold ">
        with our online coding courses , you can learn at your own pace , from
        anywhere in the world and get access to a wealth of resourses. including
        hands on projects quizes and personalized features from instructors.
      </div>

      <div className="flex flex-row gap-7 mt-8">
        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>
        <CTAButton active={false} linkto={"/login"}>
          Book a Demo
        </CTAButton>
      </div>
    </>
  );
};
export default Section1;
