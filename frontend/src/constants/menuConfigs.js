import { Eye, Edit, Trash2, Phone } from "lucide-react";

export const ACTION_MENU_ITEMS = {
  LISTING: {
    DETAILS: {
      icon: Eye,
      label: "جزئیات",
      color: "text-blue-600",
      key: "details",
    },
    EDIT: {
      icon: Edit,
      label: "ویرایش",
      color: "text-green-600",
      key: "edit",
    },
    CALL: {
      icon: Phone,
      label: "تماس",
      color: "text-purple-600",
      key: "call",
    },
    DELETE: {
      icon: Trash2,
      label: "حذف",
      color: "text-red-600",
      key: "delete",
    },
  },
};