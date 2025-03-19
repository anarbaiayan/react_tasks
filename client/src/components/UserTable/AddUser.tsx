import React, { useState } from "react";
import MyButton from "../../UI/myButton.tsx";
import AddUserModal from "./AddUserModal.tsx";


function AddUser({ onAdd, choose, setChoose }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="add_user container">
      <h2>User Table</h2>
      {open ? (
        <AddUserModal onAdd={onAdd} handleClose={handleClose} open={open} setOpen={setOpen} />
      ) : null}
      <div>
        {
          choose ? '' : <MyButton text="Add" onClick={handleOpen} />
        }
        <MyButton text={choose ? 'Back' : 'Choose'} margin="0 0 0 20px" bgcolor={choose ? 'red' : 'blue'} onClick={() => setChoose(prev => !prev)} />
      </div>
    </div>
  );
}

export default AddUser;
