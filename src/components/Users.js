import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MyButton from "../UI/myButton";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const FixedWidthCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  width: "300px",
  height: "40px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

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
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Num</StyledTableCell>
            <FixedWidthCell align="right">Name</FixedWidthCell>
            <FixedWidthCell align="right">Email</FixedWidthCell>
            <FixedWidthCell align="right">Edit</FixedWidthCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="user_table">
          {users.map((user, index) => (
            <TableRow key={user.id} className="user_table_row">
              <TableCell className="user_table_elem" component="th">{index + 1}</TableCell>
              <FixedWidthCell align="right">
                {editingId === user.id ? (
                  <TextField size="small" id="outlined-required" type="text" value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} />
                ) : <div>{user.name}</div>}
              </FixedWidthCell>
              <FixedWidthCell align="right">
                {editingId === user.id ? (
                  <TextField size="small" id="outlined-required" type="text" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                ) : <div>{user.email}</div>}
              </FixedWidthCell>
              <TableCell align="right">
                {editingId === user.id ? (
                  <MyButton bgcolor="green" text="Save" onClick={() => saveChanges(user.id)} />
                ) : (
                  <MyButton text="Edit" onClick={() => startEditing(user)} />
                )}

              </TableCell>
              <TableCell align="right">
                <MyButton bgcolor="red" icon={<DeleteOutlineIcon sx={{ size: 'small' }} />} fontSize="16px" onClick={() => onDelete(user.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default Users