import React from "react";
import { Link } from "react-router-dom";

// three componnets will be coming on props //
// * children = the text of button
//  * active = flag indicating the colour yellow or black 
//  * linkto = path to link
const Button = ({children, active,linkto}) => {
return(
    <Link to={linkto}>
        <div className={`text-center text-[15px] px-6 md:py-3 py-2 rounded-md font-bold
            ${active ? "bg-yellow-50 text-black" :"bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
        {children}

        </div>
    </Link>
)
}
export default Button;