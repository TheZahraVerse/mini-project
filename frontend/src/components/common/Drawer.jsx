import React, { useEffect } from "react";
import { X } from "lucide-react";

const Drawer = ({ isOpen, onClose, children, title, position = "right" }) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Position classes for the drawer
  const positionClasses = {
    right: {
      container: "inset-y-0 right-0",
      transform: isOpen ? "translate-x-0" : "translate-x-full",
    },
    left: {
      container: "inset-y-0 left-0",
      transform: isOpen ? "translate-x-0" : "-translate-x-full",
    },
    top: {
      container: "inset-x-0 top-0",
      transform: isOpen ? "translate-y-0" : "-translate-y-full",
    },
    bottom: {
      container: "inset-x-0 bottom-0",
      transform: isOpen ? "translate-y-0" : "translate-y-full",
    },
  };

  // Size classes
  const sizeClasses = {
    right: "w-full max-w-sm h-full",
    left: "w-full max-w-sm h-full",
    top: "w-full max-h-96",
    bottom: "w-full max-h-96",
  };

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer with slide animation */}
      <div
        className={`
          fixed z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out
          ${positionClasses[position].container}
          ${sizeClasses[position]}
          ${positionClasses[position].transform}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-[calc(100%-70px)]">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;