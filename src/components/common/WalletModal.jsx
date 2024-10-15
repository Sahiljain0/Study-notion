import React from "react";

const WalletModal = ({ isOpen, onClose, walletBalance }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">My Wallet</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-semibold"
          >
            ✕
          </button>
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-500">Wallet Balance</p>
          <p className="text-2xl font-bold">${walletBalance}</p>
        </div>
        <button
          onClick={onClose}
          className="bg-yellow-50 w-full cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
