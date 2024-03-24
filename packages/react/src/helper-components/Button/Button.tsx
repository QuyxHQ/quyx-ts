import React from "react";
import { useTheme } from "../..";

type Props = {
  children: string | React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit";
  name?: string;
};

const Button: React.FC<Props> = ({ children, className, onClick, disabled, type, name }) => {
  const theme = useTheme();

  return (
    <button
      className={`quyx ${theme} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      name={name}
    >
      {children}
    </button>
  );
};

export default Button;
