import React from "react";
import "../App.css";
import Section1 from "../components/HomeSections/Section1";
import Section2 from "../components/HomeSections/Section2";
import Section3 from "../components/HomeSections/Section3";
import Section4 from "../components/HomeSections/Section4";
import TimeLineSection from "../components/HomeSections/TimeLineSection";
import LearningLanguageSection from "../components/HomeSections/LearningLanguageSection";
import BecomeAnInsructor from "../components/HomeSections/BecomeAnInstructor";
import ReviewSlide from "../components/HomeSections/Reviews";
import Footer from "../components/common/Footer";
const Home = () => {
  return (
    <div className="relative mx-auto flex flex-col w-full items-center text-white md:justify-between">
      <div className="relative mx-2 md:px-6 lg:mx-auto flex w-full lg:w-11/12 max-w-maxContent flex-col items-center lg:justify-between gap-8 text-white">
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
      <Section4 />
      <TimeLineSection />
      <LearningLanguageSection />
      <BecomeAnInsructor />
      <ReviewSlide />
      <Footer />
    </div>
  );
};
export default Home;
