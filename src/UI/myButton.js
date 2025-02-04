import * as motion from "motion/react-client"

function MyButton({ bgcolor, color, text, onClick, icon, fontSize, type, padding, margin, className, borderRadius }) {
  const buttonStyles = {
    backgroundColor: bgcolor || 'blue',
    color: color || 'white',
    border: 'none',
    borderRadius: borderRadius || '5px',
    padding: padding || '10px 20px',
    margin: margin || "0",
    cursor: 'pointer',
    fontSize: fontSize || '14px',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      type={type} onClick={onClick} style={buttonStyles} className={className}>
      {icon && icon} {text}
    </motion.button>
  );
}

export default MyButton;
