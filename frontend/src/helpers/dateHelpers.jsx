export const getRelativeTime = (date) => {
  if (!date) return "نامشخص";
  const now = new Date();
  const created = new Date(date);
  const diffHours = Math.floor((now - created) / (1000 * 60 * 60));
  if (diffHours < 1) return "لحظاتی پیش";
  if (diffHours < 24) return `${diffHours} ساعت پیش`;
  if (diffHours < 48) return "دیروز";
  if (diffHours < 168) return `${Math.floor(diffHours / 24)} روز پیش`;
  return `${Math.floor(diffHours / 168)} هفته پیش`;
};

export const formatDate = (date) => {
  if (!date) return "نامشخص";
  return new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPrice = (price) => {
  if (!price) return "نامشخص";
  return price.toLocaleString();
};