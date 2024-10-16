import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCourses } from "../../../../services/operations/profileAPI"; // Import your buyCourses action
import PaymentModal from "../../../common/PaymentModal";
import {toast} from "react-hot-toast";
const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const handleBuyCourse = () => {
    // Open the payment modal
    setModalOpen(true);
  };


    
   
  const handlePayWithWallet = async () => {
    if (user) {
      const token = {
        userId: user._id,           // Get user ID from the user object
        accessToken: user.token,    // Get access token from the user object
       
        
      };
      console.log("token yaha pr h ji : ", token);
      const courses = cart.map(course => ({ id: course._id, price: course.price })); // Create an array of course objects
      console.log("Token is her ", token); // Debugging - Check if token object is structured correctly

      try {
        dispatch(buyCourses(token, courses, navigate));
       
        setModalOpen(false);
      


      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Payment failed. Please try again.");
      }
    } else {
      console.error("User information is missing.");
      toast.error("User information is missing. Please log in again.");
    }
  };

  return (
    <>
      <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
        <p className="mb-6 text-3xl font-semibold text-yellow-100">₹ {total}</p>
        <button className="yellowButton" onClick={handleBuyCourse}>Buy now</button>
      </div>

      {/* Render the PaymentModal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)} // Close modal handler
        coursePrice={total} // Pass the total price
        onPayWithWallet={handlePayWithWallet} // Payment function
      />
    </>
  );
};

export default RenderTotalAmount;
