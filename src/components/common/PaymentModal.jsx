
import React from "react";
import { SwipeableButton } from "react-swipeable-button";

const PaymentModal = ({ isOpen, onClose, coursePrice, onPayWithWallet }) => {
  if (!isOpen) return null;

  const successSound = new Audio('/images/notificationSound'); // Replace with your sound file path

  const onSuccess = () => {
    onPayWithWallet(); // Call your payment function
    console.log("Successfully Swiped!");
    successSound.play(); // Play the success sound
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <p className="mb-4">Total Amount: ₹{coursePrice}</p>

        <div className="mt-4">
          <SwipeableButton
            onSuccess={onSuccess} // Callback function on success
            text="Swipe to Pay" // Display text on the button
            text_unlocked="Payment Successful!" // Text after swiping
            color="#16362d" // Button color
            unlockedColor="#28a745" // Color when unlocked (optional)
          />
        </div>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
