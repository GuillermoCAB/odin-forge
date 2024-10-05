import React, { FunctionComponent, ReactNode } from "react";

interface BadgeProps {
  text: string;
  color: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export const Badge: FunctionComponent<BadgeProps> = ({
  text,
  color,
  icon,
  onClick,
}) => {
  return (
    <span
      onClick={onClick}
      className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
    >
      {text}
    </span>
  );
};
