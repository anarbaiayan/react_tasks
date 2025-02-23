import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import MyButton from "../../UI/myButton";
import UserService from "../../services/UserService.ts";
import { IUser } from "../../models/IUser.ts";
import { toast } from "react-toastify";

const FixedWidthCell = styled(TableCell)(() => ({
  width: "300px",
  height: "50px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const UserRoleChange = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>({});
  const [editedUsers, setEditedUsers] = useState<{ [key: string]: { name: string; email: string } }>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await UserService.fetchUsers();
      const usersData: IUser[] = response.data.map((user: any) => ({
        id: user.id || user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActivated: user.isActivated ?? false,
        banned: user.banned ?? false,
      }));

      setUsers(usersData);

      const initialRoles: { [key: string]: string } = {};
      usersData.forEach((user) => {
        initialRoles[user.id] = user.role;
      });
      setSelectedRoles(initialRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleInputChange = (userId: string, field: "name" | "email", value: string) => {
    setEditedUsers((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  async function updateUser(userId: string) {

    try {
      const updatedUser = editedUsers[userId] || {};
      const newRole = selectedRoles[userId];

      await UserService.updateUser(userId, {
        name: updatedUser.name ?? users.find((user) => user.id === userId)?.name,
        email: updatedUser.email ?? users.find((user) => user.id === userId)?.email,
        role: newRole,
      });
      toast.success("User has been edited");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  }

  return (
    <div>
      <Table sx={{ minWidth: 900 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <FixedWidthCell>Num</FixedWidthCell>
            <FixedWidthCell align="right">Name</FixedWidthCell>
            <FixedWidthCell align="right">Email</FixedWidthCell>
            <FixedWidthCell align="right">Edit</FixedWidthCell>
          </TableRow>
        </TableHead>

        <TableBody className="user_table">
          {users.map((user, index) => (
            <TableRow key={user.id} className="user_table_row">
              <FixedWidthCell className="user_table_elem" component="th">
                {index + 1}
              </FixedWidthCell>
              <FixedWidthCell align="right">
                <TextField
                  value={editedUsers[user.id]?.name ?? user.name}
                  onChange={(e) => handleInputChange(user.id, "name", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </FixedWidthCell>
              <FixedWidthCell align="right">
                <TextField
                  value={editedUsers[user.id]?.email ?? user.email}
                  onChange={(e) => handleInputChange(user.id, "email", e.target.value)}
                  variant="outlined"
                  size="small"
                />
              </FixedWidthCell>
              <FixedWidthCell align="right">
                <MyButton
                  className="reg_btn"
                  borderRadius="30px"
                  bgcolor="orange"
                  text="Save"
                  onClick={() => updateUser(user.id)} color={undefined} icon={undefined} fontSize={undefined} type={undefined} padding={undefined} margin={undefined}                />
              </FixedWidthCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRoleChange;
