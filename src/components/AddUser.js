import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import MyButton from "../UI/myButton";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AddUser({ onAdd }) {
  const [errors, setErrors] = useState({ name: false, email: false });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('');
    setEmail('');
    setErrors({ name: false, email: false });
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: false, email: false };

    if (!name.trim()) {
      newErrors.name = true;
      isValid = false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email.trim())) {
      newErrors.email = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    if (validateFields()) {
      onAdd({ name, email });
      setName('');
      setEmail('');
      setErrors({ name: false, email: false });
      setOpen(false);
    }
  };

  return (
    <div className="add_user">
      <h2>User Table</h2>
      <Modal open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="add_user__modal">
          <TextField
            size="small"
            id="outlined-required"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            helperText={errors.name ? "Please, enter a name" : ""}
          />
          <TextField
            size="small"
            id="outlined-required"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            helperText={errors.email ? "Please, enter a valid email" : ""}
          />
          <div className="add_user__button">
            <MyButton bgcolor="green" color="white" text="Add" onClick={handleAdd} />
            <MyButton text="Close" onClick={handleClose} />
          </div>
        </Box>
      </Modal>

      <MyButton text="Add" onClick={handleOpen} />
    </div>
  );
}

export default AddUser;
