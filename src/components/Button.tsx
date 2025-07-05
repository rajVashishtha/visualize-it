'use client';

import React from "react";
import clsx from "clsx";

// Define the types of button variants
type ButtonVariant = "default" | "secondary" | "destructive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  className,
  children,
  ...props
}) => {
  const baseStyles = "px-4 py-2 rounded-xl font-medium text-white transition-colors";
  const variantStyles = {
    default: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    destructive: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button
      className={clsx(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
