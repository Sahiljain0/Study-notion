import React from "react";
import Image from "../../assets/Images/TimelineImage.png";
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully commetted to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsiblity",
    Description: "Fully commetted to the success company",
  },
  {
    Logo: Logo3,
    heading: "Successfull",
    Description: "Fully commetted to the success company",
  },
  {
    Logo: Logo4,
    heading: "Committed",
    Description: "Fully commetted to the success company",
  },
];

const TimeLineSection = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row  gap-15 bg-[#F9F9F9] bg-opacity-100 items-center px-4 lg:px-20 py-6 lg:py-20 justify-center w-full">
        <div className="flex flex-col px-2 text-richblack-900 gap-5 w-full  lg:w-[45%]">
          {timeline.map((element, index) => {
            return (
              <div className="flex gap-6 justify-center   flex-row" key={index}>
                <div className="flex bg-white justify-center items-center h-[50px] w-[50px]">
                  <img src={element.Logo} alt="Logoimage" />
                </div>
                <div className="flex flex-col ">
                  <h2 className="font-semibold text-[18px]">
                    {element.heading}
                  </h2>
                  <p className="text-base">{element.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-6 md:ml-[20%] lg:mt-0 w-full lg:w-[50%] shadow-blue-200">
          <img
            src={Image}
            alt="timelineImage"
            className="shadow-white h-auto w-full md:w-[80%] lg:w-[500px] object-cover"
          ></img>
        <div className="absolute  flex flex-row text-white uppercasepy-10 py-7
         bg-caribbeangreen-700  -mt-12 lg:-mt-0 md:left-[8%] lg:left-[50%] lg:translate-x-[-60%] lg:translate-y-[-50%]">
          <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
            <p className="text-3xl font-bold ">10</p>
            <p className="text-caribbeangreen-300  text-sm">Years Of Experience</p>
          </div>
          <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
            <p className="text-3xl font-bold ">10</p>
            <p className="text-caribbeangreen-300 text-sm">Years Of Experience</p>
          </div>
        </div>

        </div>
      </div>
    </>
  );
};
export default TimeLineSection;
