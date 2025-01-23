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
  const [nameErrorMsg, setNameErrorMsg] = useState('none')
  const [emailErrorMsg, setEmailErrorMsg] = useState('none')

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName('')
    setEmail('')
    setEmailErrorMsg('none')
    setNameErrorMsg('none')
  }

  const nameErrorStyle = {
    display: nameErrorMsg
  }

  const emailErrorStyle = {
    display: emailErrorMsg
  }

  const handleEmail = () => {
    setEmailErrorMsg('block')
  }

  const handleName = () => {
    setNameErrorMsg('block')
  }

  const handleAdd = () => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!name) {
      handleName()
    } else if (name && re.test(email)) {
      onAdd({ name, email })
      setName('')
      setEmail('')
      setEmailErrorMsg('none')
      setNameErrorMsg('none')
      setOpen(false)
    } else {
      handleEmail()
    }
  }

  return (
    <div className="add_user">
      <h2>User Table</h2>
      <Modal open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="add_user__modal">
          <p style={nameErrorStyle} className="name_error_msg">Please, enter name</p>
          <TextField size="small" id="outlined-required" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <p style={emailErrorStyle} className="email_error_msg">Please, enter a valid email</p>
          <TextField size="small" id="outlined-required" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="add_user__button">
            <MyButton bgcolor="green" color="white" text="Add" onClick={handleAdd} />
            <MyButton text="Close" onClick={handleClose} />
          </div>
        </Box>
      </Modal>

      <MyButton text="Add" onClick={handleOpen} />
    </div>

  )
}

export default AddUser