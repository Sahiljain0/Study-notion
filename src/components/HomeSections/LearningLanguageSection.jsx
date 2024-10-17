import React from "react";
import HighLightText from "../core/HomePage/HighLightText";
import Image1 from "../../assets/Images/Know_your_progress.png";
import Image2 from "../../assets/Images/Compare_with_others.png";
import Image3 from "../../assets/Images/Plan_your_lessons.png";
import CTAButton  from "../core/HomePage/Button";
const LearningLanguageSection = () => {
  return (
    <>
      <div className="flex bg-white  flex-col items-center gap-3 px-4 md:px-20 w-full py-10">
        <div className="font-bold text-black text-3xl text-center md:text-4xl">
          Your swiss knife for
          <HighLightText text={"learning any language"} />
        </div>
        <div className="md:w-[58%] w-full text-center">
          <p className="text-base  mx-auto text-richblack-600 font-medium">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
        </div>
        <div className=" flex flex-col w-full mt-5 md:flex-row justify-center items-center">
          <img src={Image1} alt="Image1" className="object-contain -mr-30  h-[320px] w-auto"/>
          <img src={Image2} alt="Image2" className=" object-contain h-[380px] w-auto"/>
          <img src={Image3} alt="Image3"className="object-contain -ml-34 h-[320px] w-auto" />

        </div>
        <div>
           
                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          
        </div>
      </div>
    </>
  );
};
export default LearningLanguageSection;
