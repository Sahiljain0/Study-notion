import React from "react";

const PaymentModal = ({ isOpen, onClose, coursePrice, onPayWithWallet }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
        <p className="mb-4">Total Amount: ₹{coursePrice}</p>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mb-2 w-full"
          onClick={onPayWithWallet}
        >
          Pay with Wallet
        </button>
        <button
          className="bg-red-500 text-black px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
