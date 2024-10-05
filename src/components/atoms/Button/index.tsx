import Image from "next/image";
import React from "react";
import Spinner from "../../../images/spinner.svg";
import SpinnerWhite from "../../../images/spinner_white.svg";

type ButtonVariant = "solid" | "outlined" | "transparent";
type ButtonSize = "small" | "medium" | "large";
type ButtonRound = "none" | "round" | "circle";

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  isLoading?: boolean;
  round?: ButtonRound;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "solid",
  size = "medium",
  className = "",
  isLoading = false,
  round = "none",
}) => {
  const baseClasses =
    "outline-none flex justify-center items-center w-full focus:outline-none";

  // Define variant-specific classes
  const variantClasses = {
    solid: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-700",
    outlined:
      "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-100 disabled:bg-blue-100",
    transparent:
      "bg-transparent text-blue-600 hover:bg-blue-100 disabled:bg-blue-100",
  };

  const roundClasses = {
    circle: "rounded-full",
    round: "rounded",
    none: "",
  };

  // Define size-specific classes
  const sizeClasses = {
    small: "text-sm py-1.5 px-2",
    medium: "text-base py-2 px-3",
    large: "text-lg py-2.5 px-4",
  };

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${roundClasses[round]} ${sizeClasses[size]} ${className}`;

  return (
    <button onClick={onClick} className={classes} disabled={isLoading}>
      {isLoading ? (
        <Image
          src={variant === "solid" ? SpinnerWhite : Spinner}
          width={24}
          height={24}
          alt="spinner"
        />
      ) : (
        text
      )}
    </button>
  );
};
