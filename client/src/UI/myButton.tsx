import React from "react";
import { motion } from "framer-motion";
import { IButton } from "../models/IButton";

const MyButton: React.FC<IButton> = ({
  bgcolor = "blue",
  color = "white",
  text = "",
  onClick = () => {},
  icon,
  fontSize = "14px",
  type = "button",
  padding = "10px 20px",
  margin = "0",
  className = "",
  borderRadius = "5px",
  disabled = false,
}) => {
  const buttonStyles: React.CSSProperties = {
    backgroundColor: bgcolor,
    color,
    border: "none",
    borderRadius,
    padding,
    margin,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize,
    opacity: disabled ? 0.5 : 1,
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      type={type}
      onClick={!disabled ? onClick : undefined}
      style={buttonStyles}
      className={className}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>} {text}
    </motion.button>
  );
};

export default MyButton;
