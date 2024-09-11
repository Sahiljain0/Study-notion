import React from "react";

const HighLightText = ({text}) => {

    return(
        <span className="font-bold text-blue-100">
            {/*   //space inserted befor text on output // */}
            {" "}
            {text}
        </span>
    )
}
export default HighLightText;