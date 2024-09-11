// import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "./Button";
const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  codeColor,
  shadowColor,
  backgroundGradient,
}) => {
  return (
    <div className={`flex ${position} gap-10 my-20 mx-10 justify-between`}>
      {" "}
      {/* section 1 */}
      <div className="w-[50%] p-10 flex flex-col gap-8">
        {heading} 
        <div className="text-richblack-300 font-bold">{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex flex-row gap-2 items-center">
              {ctabtn1.btntext}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btntext}
          </CTAButton>
        </div>
      </div>
      {/* section 2 */}
      {/* // gradient shadow krna h  */}
      <div className={`w-[50%] flex p-10 flex-row ${shadowColor}`}>
        <div className="w-[10%] flx flex-col text-center text-richblack-400 font-bold font-inter">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={`w-[90%] flex flex-col font-mono font-bold    pr-2 ${codeColor}`}>
         <TypeAnimation
          sequence={[codeblock, 2000, ""]}
          repeat={Infinity}
          cursor={true}        
          style={
            { 
                whiteSpace:"pre-line",
                display:"block"
            }
          } 
         omitDeletionAnimation={true}
         />
        </div>



      </div>
    </div>
  );
};
export default CodeBlocks;
