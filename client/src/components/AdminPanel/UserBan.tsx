import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MyButton from "../../UI/myButton";
import UserService from "../../services/UserService.ts";
import { IUser } from "../../models/IUser.ts";
import { toast } from "react-toastify";

const FixedWidthCell = styled(TableCell)(() => ({
  width: "300px",
  height: "70px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const UserBan = () => {
  const [users, setUsers] = useState<IUser[]>([]);

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
        banned: user.banned ?? false,
        role: user.role ?? "user",
        isActivated: user.isActivated ?? false,
      }));

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }



  async function toggleBan(userId: string, isBanned: boolean) {
    try {
      await UserService.updateUserBanStatus(userId, !isBanned);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, banned: !isBanned } : user
        )
      );

      if (!isBanned) {
        toast.success("User has been banned");
      } else {
        toast.info("User has been unbanned");
      }
    } catch (error) {
      console.error("Error updating ban status:", error);
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
            <FixedWidthCell align="right">Banned</FixedWidthCell>
            <FixedWidthCell align="right">Action</FixedWidthCell>
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
                {user.banned ? "Banned" : "Not banned"}
              </FixedWidthCell>
              <FixedWidthCell align="right">
                <MyButton
                  bgcolor={user.banned ? "green" : "red"}
                  text={user.banned ? "Unblock" : "Block"}
                  fontSize="16px"
                  onClick={() => {
                    toggleBan(user.id, user.banned);
                  }} color={undefined} icon={undefined} type={undefined} padding={undefined} margin={undefined} className={undefined} borderRadius={undefined} />
              </FixedWidthCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserBan;
