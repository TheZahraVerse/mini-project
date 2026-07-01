import React from "react";
import {X} from "lucide-react"

export default function Modal({ isOpen, onClose, title, children }) {

  if (!isOpen) return null;

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e) => {
    // Only close if clicking on the backdrop itself, not on modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay - closes modal when clicked */}
      <div
        className="fixed cursor-pointer inset-0 bg-black/40 backdrop-blur-xs z-50"
        onClick={handleBackdropClick}
      />

      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        {/* Modal content */}
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-lg 
        md:max-w-2xl max-h-[90vh] pointer-events-auto overflow-y-auto">
          
          {/* Header */}
          <div className="sticky top-0 px-6 py-4 bg-white">
            <h2 className="text-xl font-bold text-gray-800 text-right">
              {title}
            </h2>

            {/* Close button */}
          <button
            onClick={onClose}
            className="absolute text-2xl cursor-pointer top-4 left-4 text-gray-400 hover:text-gray-700 transition-colors z-10"
          >
            <X size={20} />
          </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4 sm:px-6 sm:py-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}