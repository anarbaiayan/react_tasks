import * as motion from "motion/react-client"

function MyButton({ bgcolor, color, text, onClick, icon, fontSize, type, padding, margin }) {
  const buttonStyles = {
    backgroundColor: bgcolor || 'blue',
    color: color || 'white',
    border: 'none',
    borderRadius: '5px',
    padding: padding || '10px 20px',
    margin: margin || "0",
    cursor: 'pointer',
    fontSize: '14px' || fontSize
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      type={type} onClick={onClick} style={buttonStyles}>
      {icon && icon} {text}
    </motion.button>
  );
}

export default MyButton;
