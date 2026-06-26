import React from "react";

const CardView = ({ items, renderItem, cols = 4, className = "" }) => {
  // Map cols number to Tailwind grid classes
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  };

  const colClass = gridCols[cols] || gridCols[4];

  return (
    <div className={`grid ${colClass} gap-4 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.id || index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CardView;
