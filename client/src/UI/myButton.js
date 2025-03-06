import * as motion from "motion/react-client";

function MyButton({ bgcolor, color, text, onClick, icon, fontSize, type, padding, margin, className, borderRadius, disabled }) {
  const buttonStyles = {
    backgroundColor: bgcolor || "blue",
    color: color || "white",
    border: "none",
    borderRadius: borderRadius || "5px",
    padding: padding || "10px 20px",
    margin: margin || "0",
    cursor: disabled ? "not-allowed" : "pointer", 
    fontSize: fontSize || "14px",
    opacity: disabled ? 0.5 : 1, 
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}} 
      whileTap={!disabled ? { scale: 0.95 } : {}} 
      type={type}
      onClick={!disabled ? onClick : undefined} 
      style={buttonStyles}
      className={className}
      disabled={disabled} 
    >
      {icon && icon} {text}
    </motion.button>
  );
}

export default MyButton;
