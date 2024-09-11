import React from "react";
import HighLightText from "../core/HomePage/HighLightText";
import CodeBlocks from "../core/HomePage/CodeBlocks";
const Section3 = () => {
 return (
    <>
        {/* // code section 1 */}
        <div className="mx-20">
        <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-3xl font-semibold">
              Unlock your
              <HighLightText text={"coding potentials"} /> with our online
              courses.
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate for sharing their knowledge with you"
          }
          ctabtn1={{
            btntext: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btntext: "learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!Doctype html>
                 <Head>
                <Body> 
                 <h1>Hello This is sahil jain....</h1>
                 <p>Full stack developer </p>
                 <p>hello team </p>
                 <p>jjhu s </p>
                <h1>hello meloni</h1>
                 </Body>
                 </Head>
                 </html>`}
          codeColor={"text-yellow-25"}
          shadowColor={"shadow-2xl shadow-brown-400"}
        />
      </div>
      {/* //code section 2// */}
      <div className="mx-20">
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-3xl font-semibold">
              Unlock your
              <HighLightText text={"coding potentials"} /> with our online
              courses.
            </div>
          }
          subheading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate for sharing their knowledge with you"
          }
          ctabtn1={{
            btntext: "Try it yourself",
            linkto: "/signup",
            active: true,
          }}
          ctabtn2={{
            btntext: "learn more",
            linkto: "/login",
            active: false,
          }}
          codeblock={`<!Doctype html>
                 <Head>
                <Body> 
                 <h1>Hello This is sahil jain....</h1>
                 <p>Full stack developer </p>
                 <p>hello team </p>
                 <p>jjhu s </p>
                <h1>hello meloni</h1>
                 </Body>
                 </Head>
                 </html>`}
          codeColor={"text-yellow-25"}
          shadowColor={"shadow-2xl shadow-blue-400"}
        />
      </div>
    </>
 )
}
export default Section3;