import React, { useState } from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Users({ users, onDelete, onEdit }) {

  const [editingId, setEditingId] = useState(null);
  const [editingUser, setEditingUser] = useState({ name: "", email: "" })

  const startEditing = (user) => {
    setEditingId(user.id)
    setEditingUser({ name: user.name, email: user.email })
  }

  const saveChanges = (id) => {
    onEdit({ id, ...editingUser })
    setEditingId(null)
  }

  return (
    <div>
      <h2>User Table</h2>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Num</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody >
          {users.map((user, index) => (
            <TableRow key={user.id} className="user_table">
              <TableCell component="th">{index + 1}</TableCell>
              <TableCell align="right">
                {editingId === user.id ? (
                  <TextField size="small" id="outlined-required" type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
                ) : <div>{user.name}</div>}
              </TableCell>
              <TableCell align="right">
                {editingId === user.id ? (
                  <TextField size="small" id="outlined-required" type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                ) : <div>{user.email}</div>}
              </TableCell>
              <TableCell align="right">
                {editingId === user.id ? (
                  <Button size="small" variant="contained" color="success" onClick={() => saveChanges(user.id)}>Save</Button>
                ) : (
                  <Button size="small" variant="contained" onClick={() => startEditing(user)}>Edit</Button>
                )}

              </TableCell>
              <TableCell align="right">
                <Button size="small" variant="outlined" startIcon={<DeleteIcon />} color="error" onClick={() => onDelete(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>

  )
}

export default Users