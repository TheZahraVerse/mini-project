import React from "react";

const ListView = ({ items, columns, renderRow, className = "" }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">هیچ داده‌ای یافت نشد</div>
    );
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-175">
          <thead className="bg-gray-50 border-b">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`text-right p-3 whitespace-nowrap ${col.className || ""}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={item.id || index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {renderRow(item, index)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
