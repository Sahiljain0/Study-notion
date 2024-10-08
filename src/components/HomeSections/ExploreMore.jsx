import React ,{useState}from "react";
import HighLightText from "../core/HomePage/HighLightText";
import "../../App.css"
import { HomePageExplore } from "../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skill Paths",
  "Career Paths",
];
const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const  setMyCards = (value) => {
    console.log("element :" ,value)
    setCurrentTab(value);
    const result = HomePageExplore.filter((courses) => courses.tag === value);
    setCourses(result[0].courses);
    
    setCurrentCard(result[0].courses[0].heading);
  }
  return (
    <div className="relative flex w-full px-20 flex-col  items-center mb-28 my-6 ">
      <div className="text-4xl font-bold">
        Unlock the
        <HighLightText text={"Power of code"} />
      </div>
      <div className="text-richblack-300 text-md my-4 mb-10">
        Learn to build Anthing you can imagine.
      </div>
     
      {/* **************************************************** */}
  
      <div className="hidden lg:flex gap-5 -mt-15 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((element, index) => {
          return (
            <div
              className={`text-sm font-semibold cursor-pointer
              ${
                currentTab === element
                  ? " bg-richblack-900   "
                  : "bg-richblack-800 "
              }  py-2 px-4 rounded-full transition-all duration-200 ease-in-out  text-richblack-200`}
              key={index}
              onClick={() => setMyCards(element)}
              >
             
              {element}
            </div>
             
          );
        })}
      </div>
      <div className="hidden lg:block lg:h-[200px]"></div>

   {/* **************************************************************** */}
 
   <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
   {
            courses.map(  (element, index) => {
                return (
                    <CourseCard 
                    key={index}
                    cardData = {element}
                    currentCard = {currentCard}
                    setCurrentCard = {setCurrentCard}
                    />
                )
            } )
        }
      </div>
    </div>
  );
};
export default ExploreMore;
