import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import MyButton from "../../UI/myButton.tsx";
import UserService from "../../services/UserService.ts";
import {IUser} from '../../models/IUser.ts'
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
  

  const handleRoleChange = (userId: string, newRole: string) => {
    setSelectedRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));
  };

  async function updateUserRole(userId: string | undefined) {
    if (!userId) {
      console.error("Error: userId is undefined!");
      return;
    }

    try {
      const newRole = selectedRoles[userId];

      await UserService.updateUserRole(userId, newRole);
      toast.success("User role changed");
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Error updating user role");
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
            <FixedWidthCell align="right">Role</FixedWidthCell>
            <FixedWidthCell align="right">Edit</FixedWidthCell>
          </TableRow>
        </TableHead>

        <TableBody className="user_table">
          {users.map((user, index) => (
            <TableRow key={user.id} className="user_table_row">
              <FixedWidthCell className="user_table_elem" component="th">
                {index + 1}
              </FixedWidthCell>
              <FixedWidthCell align="right">{user.name}</FixedWidthCell>
              <FixedWidthCell align="right">{user.email}</FixedWidthCell>
              <FixedWidthCell align="right">
                <Select
                  key={user.id}
                  value={selectedRoles[user.id] || user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                </Select>
              </FixedWidthCell>
              <FixedWidthCell align="right">
                <MyButton
                  className="reg_btn"
                  borderRadius="30px"
                  bgcolor="orange"
                  text="Save"
                  onClick={() => {
                    if (!user.id) {
                      console.error("Error: user has no ID!");
                    }
                    updateUserRole(user.id);
                  }}
                  color={undefined}
                  icon={undefined}
                  fontSize={undefined}
                  type={undefined}
                  padding={undefined}
                  margin={undefined}
                />
              </FixedWidthCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserRoleChange;
