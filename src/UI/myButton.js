function MyButton({ bgcolor, color, text, onClick, icon, fontSize, type }) {
  const buttonStyles = {
    backgroundColor: bgcolor || 'blue',
    color: color || 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '14px' || fontSize
  };

  return (
    <button type={type} onClick={onClick} style={buttonStyles}>
      {icon && icon} {text}
    </button>
  );
}

export default MyButton;
