// import React from "react";
// import { SwipeableButton } from "react-swipeable-button";
// import { FaTimes } from "react-icons/fa"; // Importing a cancel icon from react-icons

// const PaymentModal = ({ isOpen, onClose, coursePrice, onPayWithWallet }) => {
//   if (!isOpen) return null;

//   const onSuccess = () => {
//     onPayWithWallet(); // Call your payment function
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
//         {" "}
//         {/* Added relative positioning */}
//         <button
//           className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" // Style for the cancel icon
//           onClick={onClose}
//           aria-label="Close"
//         >
//           <FaTimes size={20} className="text-yellow-200" />{" "}
//           {/* Render the cancel icon */}
//         </button>
//         <h2 className="text-2xl font-semibold mb-4">Payment</h2>
//         <p className="mb-4">Total Amount: ₹{coursePrice}</p>
//         <div className="mt-4">
//           <SwipeableButton
//             onSuccess={onSuccess} // Callback function on success
//             text="Swipe to Pay" // Display text on the button
//             unlockedColor="#28a745" // Color when unlocked (optional)
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentModal;
import React from "react";
import { SwipeableButton } from "react-swipeable-button";
import { FaTimes } from "react-icons/fa"; 

const PaymentModal = ({ isOpen, onClose, coursePrice, onPayWithWallet }) => {
  if (!isOpen) return null;

  const onSuccess = () => {
    onPayWithWallet();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes size={20} className="text-yellow-200" />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <p className="mb-4">Total Amount: ₹{coursePrice}</p>
        <div className="mt-4 relative">
          <SwipeableButton
            onSuccess={onSuccess}
            text="Swipe to Pay"
            unlockedColor="#28a745"
            className="smooth-swipe-button"
          />
        </div>
      </div>

      <style jsx>{`
        /* Smooth swipe styles */
        .smooth-swipe-button {
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease-in-out;
        }

        .smooth-swipe-button .swipeable-button__handler {
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .smooth-swipe-button .swipeable-button__content {
          transition: opacity 0.4s ease;
        }
      `}</style>
    </div>
  );
};

export default PaymentModal;
