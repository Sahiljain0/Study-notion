import React from "react";
import CTAButton from "../core/HomePage/Button";
import HighLightText from "../core/HomePage/HighLightText";
import { FaArrowRight } from "react-icons/fa";
import "../../App.css";
const Section4 = () => {
  return (
    <>
      {/* *************************SECTION 2************************** */}
      <div className="w-full bg-pure-greys-5 text-richblack-700 ">
        <div className="homepage_bg  bg-white h-[310px]">
          <div className="flex flex-col w-11/12 justify-between max-w-maxContent mx-auto items-center gap-5">
            <div className="h-[150px] "></div>
            <div className="flex flex-row   text-white font-bold gap-7 ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catelog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 flex flex-col px-20 mt-[95px] mb-10 mx-auto max-w-maxContent  items-center justify-between gap-5">
          <div className="flex flex-row gap-5 ">
            <div className="font-bold w-[50%] text-4xl">
              Get the skills you need for a
              <HighLightText text={" job that is in demand "} />
            </div>
            <div className="flex  w-[50%] items-start flex-col gap-10 ">
              <div className="text-[16px]">
                The Modern StudyNotion is the dipcates its own lerns. Today to
                be a cpmpetetive speciaolist requires more than professional
                skills
              </div>
              <CTAButton active={true} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section4;
