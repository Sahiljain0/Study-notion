import { toast } from "react-hot-toast";

// import { setLoading, setUser } from "../../Redux/slices/profileSlice";
import {
  setLoading,
  setUser,
  updateUserWallet,
} from "../../Redux/slices/profileSlice";

import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
  GET_WALLET_DATA,
} = profileEndpoints;

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_USER_DETAILS API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      const userImage = response.data.data.image
        ? response.data.data.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
      dispatch(setUser({ ...response.data.data, image: userImage }));
    } catch (error) {
      dispatch(logout(navigate));
      console.log("GET_USER_DETAILS API ERROR............", error);
      toast.error("Could Not Get User Details");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES");
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}

// // Frontend API call function
// export function purchaseWithWallet(token, purchaseAmount, courseId) {
//   return async (dispatch) => {
//     const toastId = toast.loading("Processing purchase...");
//     dispatch(setLoading(true));

//     if (!token || !purchaseAmount || !courseId) {
//       toast.error("Missing required fields");
//       dispatch(setLoading(false));
//       toast.dismiss(toastId);
//       return;
//     }

//     try {
//       const response = await apiConnector(
//         "POST",
//         GET_WALLET_DATA,
//         {
//           userId: token.userId,
//           purchaseAmount,
//           courseId,
//         },
//         {
//           Authorization: `Bearer ${token.accessToken}`,
//         }
//       );
//       console.log("course : ", courseId);
//       console.log("PURCHASE_WITH_WALLET API RESPONSE:", response.data);

//       if (!response.data.success) {
//         throw new Error(response.data.message);
//       }

//       const updatedWalletBalance = response.data.updatedWalletBalance;
//       dispatch(updateUserWallet(updatedWalletBalance));
//       toast.success("Purchase successful!");
//     }
//     catch (error) {
//       // Check if the error response contains a message from the backend
//       if (error.response && error.response.data && error.response.data.message) {
//         const errorMessage = error.response.data.message;
//         toast.error(errorMessage); // Show the backend error message as a toast
//       } else {
//         // Fallback error message if something else went wrong
//         toast.error("An unexpected error occurred. Please try again later.");
//       }
//     };
  
// }
// }
// Frontend API call function
export function purchaseWithWallet(token, purchaseAmount, courseId, navigate) {
  return async (dispatch) => {
    // Show a loading toast message
    const toastId = toast.loading("Processing purchase...");
    dispatch(setLoading(true));

    // Check for missing required fields
    if (!token || !purchaseAmount || !courseId) {
      toast.error("Missing required fields");
      dispatch(setLoading(false));
      toast.dismiss(toastId);
      return;
    }

    try {
      const response = await apiConnector(
        "POST",
        GET_WALLET_DATA,
        {
          userId: token.userId,
          purchaseAmount,
          courseId,
          
        },
        {
          Authorization: `Bearer ${token.accessToken}`,
        }
      );

      console.log("course : ", courseId);
      console.log("PURCHASE_WITH_WALLET API RESPONSE:", response.data);

      // If the response indicates failure, throw an error to handle it in the catch block
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Extract the updated wallet balance from the response
      const updatedWalletBalance = response.data.updatedWalletBalance;
      dispatch(updateUserWallet(updatedWalletBalance));
        // Play the notification sound
        const notificationSound = document.getElementById("notificationSound");
        notificationSound.play();
      // Update the toast with a success message
      toast.success("Purchase successful!");
      navigate("dashboard/my-courses");
    } catch (error) {
      console.error("Error during purchase:", error);

      // Dismiss the loading toast before showing an error message
      toast.dismiss(toastId);

      // Check if the error response contains a message from the backend
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage); // Show the backend error message as a toast
      } else {
        // Fallback error message if something else went wrong
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      // Ensure the loading state is reset regardless of success or failure
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
