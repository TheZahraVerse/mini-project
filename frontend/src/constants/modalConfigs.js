// Types
export const MODAL_TYPES = {
  DELETE: "delete",
  STATUS_CHANGE: "status_change",
  CONFIRM: "confirm",
  EDIT: "edit",
};

// Modal Configs
export const MODAL_CONFIGS = {
  [MODAL_TYPES.DELETE]: {
    title: "تأیید حذف",
    message: (data) => {
      if (data?.type === "bulk") {
        return `آیا از حذف ${data.ids?.length} آیتم انتخاب شده مطمئن هستید؟`;
      }
      return "آیا از حذف این آیتم مطمئن هستید؟";
    },
    confirmText: "حذف",
    cancelText: "انصراف",
    variant: "danger",
  },

  [MODAL_TYPES.STATUS_CHANGE]: {
    title: "تأیید تغییر وضعیت",
    message: (data) => {
      const listing = data?.listing;
      const newStatus = data?.newStatus;
      const statusMap = {
        reviewed: "بررسی شده",
        contacted: "تماس گرفته شده",
        converted: "تبدیل شده",
        rejected: "رد شده",
      };
      const statusLabel = statusMap[newStatus] || newStatus;
      const title = listing?.property?.title || listing?.title || "این آگهی";
      return `آیا از تغییر وضعیت آگهی "${title}" به "${statusLabel}" مطمئن هستید؟`;
    },
    confirmText: "تغییر وضعیت",
    cancelText: "انصراف",
    variant: "warning",
  },

  [MODAL_TYPES.CONFIRM]: {
    title: (data) => data?.title || "تأیید عملیات",
    message: (data) => data?.message || "آیا از انجام این عملیات مطمئن هستید؟",
    confirmText: (data) => data?.confirmText || "تأیید",
    cancelText: (data) => data?.cancelText || "انصراف",
    variant: (data) => data?.variant || "info",
  },

  [MODAL_TYPES.EDIT]: {
    title: "تأیید ویرایش",
    message: (data) => data?.message || "آیا از تغییرات انجام شده مطمئن هستید؟",
    confirmText: "ذخیره تغییرات",
    cancelText: "انصراف",
    variant: "info",
  },
};

// Helper Function
export const getModalConfig = (type, data = {}) => {
  const config = MODAL_CONFIGS[type];
  if (!config) return null;

  return {
    title: typeof config.title === "function" ? config.title(data) : config.title,
    message: typeof config.message === "function" ? config.message(data) : config.message,
    confirmText: typeof config.confirmText === "function" ? config.confirmText(data) : config.confirmText,
    cancelText: typeof config.cancelText === "function" ? config.cancelText(data) : config.cancelText,
    variant: typeof config.variant === "function" ? config.variant(data) : config.variant,
  };
};