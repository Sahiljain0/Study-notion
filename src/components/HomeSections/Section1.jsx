import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../core/HomePage/HighLightText";
import CTAButton from "../core/HomePage/Button";
const Section1 = () => {
  return (
    <>
       {/* Become a Instructor Button */}
       <Link to={"/signup"}>
       <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover: scale-95 w-fit max-w-maxContent'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p><FaArrowRight/>
                </div>
            </div>
        </Link>
       {/* Heading */}
       <div className="text-center text-3xl  md:text-4xl font-semibold">
          Empower Your Future with
          <HighLightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
       {/* CTA Buttons */}
       <div className="mt-8 flex flex-row gap-7">
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
