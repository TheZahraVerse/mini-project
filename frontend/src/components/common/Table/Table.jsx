import React from "react";

const Table = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  );
};

const Header = ({ children, className = "" }) => {
  return (
    <thead>
      <tr className={`bg-gray-50/80 border-b border-gray-200 ${className}`}>{children}</tr>
    </thead>
  );
};

const Column = ({ children, className = "", align = "right", width }) => {
  const alignClasses = { right: "text-right", center: "text-center", left: "text-left" };
  return (
    <th
      className={`p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${alignClasses[align]} ${className}`}
      style={width ? { width, minWidth: width } : {}}
    >
      {children}
    </th>
  );
};

const Body = ({ children, className = "" }) => {
  return <tbody className={className}>{children}</tbody>;
};

const Row = ({ children, className = "", onClick = null }) => {
  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50/60 transition-colors even:bg-gray-50/30 ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const Cell = ({ children, className = "", align = "right", width, colSpan }) => {
  const alignClasses = { right: "text-right", center: "text-center", left: "text-left" };
  return (
    <td
      colSpan={colSpan}
      className={`p-2.5 ${alignClasses[align]} ${className}`}
      style={width ? { width, minWidth: width } : {}}
    >
      {children}
    </td>
  );
};

Table.Header = Header;
Table.Column = Column;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export default Table;