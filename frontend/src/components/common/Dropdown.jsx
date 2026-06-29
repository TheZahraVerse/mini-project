import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  trigger,
  items,
  position = "left",
  className = "",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
        setIsPositionCalculated(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && ref.current && !isPositionCalculated) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      if (spaceBelow < 150 && spaceAbove > 150) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
      setIsPositionCalculated(true);
    }
  }, [isOpen, isPositionCalculated]);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsPositionCalculated(false);
    } else {
      setIsOpen(true);
    }
  };

  const positionClasses = {
    left: "left-0",
    right: "right-0",
  };

  const dropdownPositionClass = dropdownPosition === "top" 
    ? "bottom-full top-auto mb-1" 
    : "top-full mt-1";

  return (
    <div className="relative" ref={ref}>
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${dropdownPositionClass} bg-white border border-gray-200 rounded-xl shadow-lg z-100 py-1 min-w-32.5 ${positionClasses[position]} ${className}`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
                setIsPositionCalculated(false);
                onSelect?.(item);
              }}
              className={`w-full text-right cursor-pointer px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-gray-50 transition-colors ${item.color || "text-gray-700"}`}
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