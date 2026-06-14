import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CollapsibleGroup = ({ title, children, defaultOpen = false, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current?.scrollHeight || 0);
    } else {
      setHeight(0);
    }
  }, [isOpen, children]);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center
         w-full py-3 text-right group transition-colors hover:bg-gray-50 rounded-lg px-2 cursor-pointer"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon size={16} className="text-gray-400" />}
          <span className="text-sm font-semibold text-gray-700">{title}</span>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-0" : ""}`}>
          {isOpen ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </div>
      </button>

      <div
        ref={contentRef}
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="pb-3 pr-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleGroup;