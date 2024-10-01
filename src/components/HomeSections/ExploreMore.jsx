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
    <div className="relative flex w-full px-20 flex-col pb-32 items-center mb-28 my-20 gap-5">
      <div className="text-4xl font-bold">
        Unlock the
        <HighLightText text={"Power of code"} />
      </div>
      <div className="text-richblack-300 text-md font-semibold">
        Learn to build Anthing you can imagine.
      </div>
     
      {/* **************************************************** */}
  
    <div className="flex rounded-full py-1 bg-richblack-800 font-semibold text-sm px-1 flex-row justify-center items-center gap-4">
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
   {/* **************************************************************** */}
 
   <div className='absolute top-48 flex gap-9 w-full justify-center  mt-5 flex-wrap lg:absolute right-0 left-0 mr-auto ml-auto'>
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
