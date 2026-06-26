import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  icon = null,
  iconPosition = "left",
}) => {
  const variants = {
    primary:
      "bg-blue-500 hover:bg-blue-600 text-white border-transparent shadow-sm hover:shadow",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200",
    outline: "bg-transparent hover:bg-gray-50 text-gray-600 border-gray-300",
    danger: "bg-red-500 hover:bg-red-600 text-white border-transparent",
    success: "bg-green-500 hover:bg-green-600 text-white border-transparent",
    filter:
      "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm hover:shadow",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-5 py-2.5 text-base gap-2.5",
  };

  const baseStyles =
    "rounded-lg font-medium transition-all duration-200 flex items-center justify-center border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
};

export default Button;
