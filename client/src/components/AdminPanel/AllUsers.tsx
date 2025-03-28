import React, { useState, useEffect } from 'react';
import { IUser } from '../../models/IUser';
import UserService from '../../services/UserService.ts';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const AllUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const FixedWidthCell = styled(TableCell)(() => ({
    width: "350px",
    height: "70px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }));

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
              <FixedWidthCell className="user_table_elem" component="th">{index + 1}</FixedWidthCell>
              <FixedWidthCell align="right">{user.name}</FixedWidthCell>
              <FixedWidthCell align="right">{user.email}</FixedWidthCell>
              <FixedWidthCell align="right">{user.role}</FixedWidthCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUsers;
