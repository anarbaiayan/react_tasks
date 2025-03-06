import React, {  useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MyButton from "../../UI/myButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IUserTable } from "../../models/IUserTable";
import { toast } from "react-toastify";

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

function Users({ users, setUsers, onDelete, onEdit, onDeleteUsers }) {
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
    console.log(id)
    if(!id){
      return
    }
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
    } catch (error) {
      console.error("Error deleting selected users:", error);
      toast.error("Failed to delete some users");
    }
  };
  
  

  return (
    <div>
      <MyButton
        text="Delete Selected"
        bgcolor="red"
        onClick={deleteSelectedUsers}
        disabled={selectedUsers.size === 0} color={undefined} icon={undefined} fontSize={undefined} type={undefined} padding={undefined} margin={undefined} className={undefined} borderRadius={undefined}      />

      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Select</StyledTableCell>
            <StyledTableCell>Num</StyledTableCell>
            <FixedWidthCell align="right">Name</FixedWidthCell>
            <FixedWidthCell align="right">Email</FixedWidthCell>
            <FixedWidthCell align="right">Edit</FixedWidthCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="user_table">
          {users.map((user: IUserTable, index: number) => (
            <TableRow key={user.id || index} className="user_table_row">
              <TableCell>
                <Checkbox
                  checked={selectedUsers.has(user.id)}
                  onChange={() => toggleSelectUser(user.id)}
                />
              </TableCell>
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
                  <MyButton bgcolor="green" text="Save" onClick={() => saveChanges(user.id)} color={undefined} icon={undefined} fontSize={undefined} type={undefined} padding={undefined} margin={undefined} className={undefined} borderRadius={undefined} disabled={undefined} />
                ) : (
                  <MyButton text="Edit" onClick={() => startEditing(user)} bgcolor={undefined} color={undefined} icon={undefined} fontSize={undefined} type={undefined} padding={undefined} margin={undefined} className={undefined} borderRadius={undefined} disabled={undefined} />
                )}
              </TableCell>
              <TableCell align="right">
                <MyButton
                  bgcolor="red"
                  icon={<DeleteOutlineIcon sx={{ size: "small" }} />}
                  fontSize="16px"
                  onClick={() => onDelete(user.id)} color={undefined} text={undefined} type={undefined} padding={undefined} margin={undefined} className={undefined} borderRadius={undefined} disabled={undefined}                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Users;
