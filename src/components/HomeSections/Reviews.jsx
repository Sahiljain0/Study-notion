import React from "react";
import Image1 from "../../assets/TimeLineLogo/Logo1.svg";
import Image2 from "../../assets/TimeLineLogo/Logo2.svg";
import Image3 from "../../assets/TimeLineLogo/Logo3.svg";
import Image4 from "../../assets/TimeLineLogo/Logo4.svg";



const reviews = [
    {
        name: "john dev",
        logo:Image1,
        company:"Microsoft vt.ltd ",
        Description:"hello this is john dev  from last 5 years having a good knowledge abpute s2vhd.",
        rating:"5",
    },
    {
        name: "john dev",
        logo:Image2,
        company:"Microsoft",
        Description:"hello this is john dev from last 5 years having a good knowledge abpute s2vhd.",
        rating:"5",
    },
    {
        name: "john dev",
        logo:Image3,
        company:"Microsoft",
        Description:"hello this is john dev from last 5 years having a good knowledge abpute s2vhd.",
        rating:"5",
    },
    {
        name: "john dev",
        logo:Image4,
        company:"Microsoft",
        Description:"hello this is john from last 5 years having a good knowledge abpute s2vhd.",
        rating:"5",
    },
];
const Reviews = () => {
    return(
        <>
            <div className="flex flex-col items-center  px-20 gap-8 mt-10 my-10">
                <div>
                    <h1 className="text-3xl font-bold">Reviews from other learners</h1>
                </div>
                <div className="flex items-center gap-4 ">
                  {reviews.map((element,index) => {
                    return(
                       <>
                       <div className="flex items-start gap-2 flex-col bg-richblack-800 p-6 rounded-sm" key={index}>
                          <div className="flex flex-row items-center  gap-4">
                            <div>
                                <img src={element.logo} alt="Logos"/>
                                
                            </div>
                            <div>
                                <p>{element.name}</p>
                                <p className="text-md text-richblack-300">{element.company}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-richblack-50">{element.Description}</p>
                          </div>
                          <div>
                            <p>{element.rating}</p>
                          </div>
                       </div>
                       </>

                    )
                  })}
                </div>
            </div>
        </>
    );



}

export default Reviews;