import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MyButton from "../../UI/myButton";
import TextField from '@mui/material/TextField';

const FixedWidthCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  width: "300px",
  height: "50px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const UserRoleChange = () => {
  const { userData, editUser } = useOutletContext();

  const [editingId, setEditingId] = useState(null);
  const [editingUser, setEditingUser] = useState({ role: ""})

  const startEditing = (user) => {
    setEditingId(user.id)
    setEditingUser({ role: user.role})
  }

  const saveChanges = (id) => {
    editUser({ id, ...editingUser })
    setEditingId(null)
  }

  return (
    <div>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <FixedWidthCell>Num</FixedWidthCell>
            <FixedWidthCell align="right">Name</FixedWidthCell>
            <FixedWidthCell align="right">Email</FixedWidthCell>
            <FixedWidthCell align="right">Role</FixedWidthCell>
            <FixedWidthCell align="right">Edit</FixedWidthCell>
          </TableRow>
        </TableHead>

        <TableBody className="user_table">
          {userData.map((user, index) => (
            <TableRow key={user.id} className="user_table_row">
              <FixedWidthCell className="user_table_elem" component="th">{index + 1}</FixedWidthCell>
              <FixedWidthCell align="right">
                <div>{user.name}</div>
              </FixedWidthCell>
              <FixedWidthCell align="right">
                <div>{user.email}</div>
              </FixedWidthCell>
              <FixedWidthCell align="right">
                {editingId === user.id ? (
                  <TextField size="small" id="outlined-required" type="text" value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} />
                ) : <div>{user.role}</div>}
              </FixedWidthCell>
              <FixedWidthCell align="right">
                {editingId === user.id ? (
                  <MyButton bgcolor="green" text="Save" onClick={() => saveChanges(user.id)} />
                ) : (
                  <MyButton text="Edit" onClick={() => startEditing(user)} />
                )}

              </FixedWidthCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default UserRoleChange