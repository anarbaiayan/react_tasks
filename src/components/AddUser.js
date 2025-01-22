import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function AddUser({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [add, setAdd] = useState(false);

  const handleAdd = () => {
    if (name && email) {
      onAdd({ name, email })
      setName('')
      setEmail('')
    } else {
      alert("Enter email and name")
    }
  }

  return (
    <div className="add_user">
      {add === true ? (
        <div className="add-user">
          <TextField size="small" id="outlined-required" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField size="small" id="outlined-required" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button variant="contained" color="success" onClick={handleAdd}>Add</Button>
          <Button variant="contained" onClick={() => setAdd(false)}>Close</Button>
        </div>
      ) : (
        <Button variant="contained" onClick={() => setAdd(true)}>Add</Button>
      )}
    </div>

  )
}

export default AddUser