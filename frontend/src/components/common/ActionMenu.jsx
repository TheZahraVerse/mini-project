import React from "react";
import Dropdown from "./dropdown/Dropdown";
import { MoreHorizontal } from "lucide-react";
import { ACTION_MENU_ITEMS } from "../../constants/menuConfigs";

const ActionMenu = ({
  onViewDetails,
  onEdit,
  onDelete,
  onCall,
  trigger = null,
  position = "left",
  className = "",
}) => {
  // items in menu
  const items = [];

  if (onViewDetails) {
    items.push({
      ...ACTION_MENU_ITEMS.LISTING.DETAILS,
      onClick: onViewDetails,
    });
  }
  if (onEdit) {
    items.push({
      ...ACTION_MENU_ITEMS.LISTING.EDIT,
      onClick: onEdit,
    });
  }
  if (onCall) {
    items.push({
      ...ACTION_MENU_ITEMS.LISTING.CALL,
      onClick: onCall,
    });
  }
  if (onDelete) {
    items.push({
      ...ACTION_MENU_ITEMS.LISTING.DELETE,
      onClick: onDelete,
    });
  }

  if (items.length === 0) return null;

  const defaultTrigger = (
    <button className="text-gray-400 cursor-pointer hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200">
      <MoreHorizontal size={16} />
    </button>
  );

  return (
    <Dropdown
      trigger={trigger || defaultTrigger}
      items={items}
      position={position}
      className={className}
    />
  );
};

export default ActionMenu;