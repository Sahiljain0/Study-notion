import React from "react";
import HighLightText from "../core/HomePage/HighLightText";
import CodeBlocks from "../core/HomePage/CodeBlocks";
import ExploreMore from "./ExploreMore";
const Section3 = () => {
 return (
    <>
       {/* Code Section 1  */}
       <div >
          <CodeBlocks
            position={"lg:flex-row    flex-col "}
            heading={
              <div className="md:text-4xl text-3xl mb-2  font-semibold">
                Unlock your
                <HighLightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btntext: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btntext: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse hidden"}
            heading={
              <div className="w-[100%] md:text-4xl text-3xl mb-2 font-semibold lg:w-[50%]">
                Start
                <HighLightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btntext: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btntext: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

      <ExploreMore/>
    </>
 )
}
export default Section3;