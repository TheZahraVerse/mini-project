import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({
  trigger,
  items,
  position = "left",
  className = "",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const positionClasses = {
    left: "left-0",
    right: "right-0",
  };

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 min-w-32.5 ${positionClasses[position]} ${className}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
                onSelect?.(item);
              }}
              className={`w-full text-right px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-50 transition-colors ${item.color || "text-gray-700"}`}
            >
              {item.icon && <item.icon size={14} />}
              {item.label}
              {item.active && <span className="text-blue-500 mr-auto">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;