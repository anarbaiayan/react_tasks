import { JSX } from "react";

export interface IButton {
  bgcolor?: string;
  color?: string;
  text?: string;
  onClick?: () => void;
  icon?: string | JSX.Element;
  fontSize?: string;
  type?: "button" | "submit" | "reset";
  padding?: string;
  margin?: string;
  className?: string;
  borderRadius?: string;
  disabled?: boolean;
}
