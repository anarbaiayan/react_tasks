import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MyButton from "../../UI/myButton.tsx";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IUserTable } from "../../models/IUserTable";
import { toast } from "react-toastify";
import DeleteConfirmModal from "./DeleteConfirmModal.tsx";

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

function Users({ users, setUsers, onDelete, onEdit, onDeleteUsers, choose, setChoose, open, setOpen, handleOpen, handleClose }) {
  const [id, setId] = useState<string>()

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState({ name: "", email: "" });
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  const startEditing = (user) => {
    if (editingId === user.id) {
      setEditingId(null);
      setEditingUser({ name: "", email: "" });
    } else {
      setEditingId(user.id);
      setEditingUser({
        name: user.name ? String(user.name) : "",
        email: user.email ? String(user.email) : "",
      });
    }
  };

  const saveChanges = async (id: string) => {
    try {
      const updatedUser = { id, ...editingUser };
      await onEdit(updatedUser);

      setEditingId(null);
      setEditingUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const deleteSelectedUsers = async () => {
    if (selectedUsers.size === 0) return;

    try {
      await onDeleteUsers([...selectedUsers]);
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.has(user._id)));
      setSelectedUsers(new Set());
      setChoose(false)
      handleClose()
    } catch (error) {
      console.error("Error deleting selected users:", error);
      toast.error("Failed to delete some users");
    }
  };

  const saveUserId = (userId: string) => {
    setId(userId)
    handleOpen()
  }

  return (
    <div>
      {
        choose ? <MyButton
          bgcolor="red"
          onClick={handleOpen}
          disabled={selectedUsers.size === 0}
          icon={<DeleteOutlineIcon sx={{ size: "small" }} />}
          borderRadius='50%'
          padding="20px"
          className="multi_delete"
        />
          : ''
      }
      <DeleteConfirmModal open={open} handleClose={handleClose} deleteSelectedUsers={deleteSelectedUsers} onDelete={onDelete} id={id} choose={choose} />

      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {
              choose ? <StyledTableCell>Select</StyledTableCell> : ''
            }
            <StyledTableCell>Num</StyledTableCell>
            <FixedWidthCell align="right">Name</FixedWidthCell>
            <FixedWidthCell align="right">Email</FixedWidthCell>
            <FixedWidthCell align="right">Edit</FixedWidthCell>
            {
              choose ? '' : <StyledTableCell align="right">Delete</StyledTableCell>
            }
          </TableRow>
        </TableHead>

        <TableBody className="user_table">
          {users.map((user: IUserTable, index: number) => (
            <TableRow key={user.id || index} className="user_table_row">
              {choose ?
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onChange={() => toggleSelectUser(user.id)} />
                </TableCell>
                : ''
              }

              <TableCell className="user_table_elem" component="th">
                {index + 1}
              </TableCell>
              <FixedWidthCell align="right">
                {editingId === user.id ? (
                  <TextField
                    size="small"
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                ) : (
                  <div>{user.name}</div>
                )}
              </FixedWidthCell>
              <FixedWidthCell align="right">
                {editingId === user.id ? (
                  <TextField
                    size="small"
                    type="text"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                ) : (
                  <div>{user.email}</div>
                )}
              </FixedWidthCell>
              <TableCell align="right">
                {editingId === user.id ? (
                  <MyButton bgcolor="green" text="Save" onClick={() => saveChanges(user.id)} />
                ) : (
                  <MyButton text="Edit" onClick={() => startEditing(user)} />
                )}
              </TableCell>
              {
                choose ? '' :
                  <TableCell align="right">
                    <MyButton
                      bgcolor="red"
                      icon={<DeleteOutlineIcon sx={{ size: "small" }} />}
                      fontSize="16px"
                      onClick={() => saveUserId(user.id)} />
                  </TableCell>
              }

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;
