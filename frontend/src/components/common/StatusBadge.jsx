import React from "react";
import { getListingStatus } from "../../constants/statusConfig";

const StatusBadge = ({ status, className = "" }) => {
  const config = getListingStatus(status);

  return (
    <span
      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${config.bgColor} ${config.textColor} ${className}`}
    >
      {config.text}
    </span>
  );
};

export default StatusBadge;