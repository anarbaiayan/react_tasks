import React, { useEffect, useState } from "react";
import AddUser from "../components/UserTable/AddUser";
import Users from "../components/UserTable/Users";
import UserTableService from "../services/UserTableService.ts";
import { IUserTable } from "../models/IUserTable.ts";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState<IUserTable[]>([]);


  useEffect(() => {
    fetchUsers();
  }, []); 

  async function fetchUsers() {
    try {
      const response = await UserTableService.fetchUsers();
      const usersData = response.data.map((user: any) => ({
        id: user.id || user._id,
        name: user.name,
        email: user.email,
      }));

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  async function addUser(user: IUserTable) {
    try {
      const response = await UserTableService.addUser(user.name, user.email);
      setUsers([...users, response.data]);
      toast.success('User added successfully')
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error('Error')
    }
  }

  async function deleteUser(id: string) {
    try {
      await UserTableService.deleteUser(id);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.success('User deleted successfully')
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      toast.error('Error')
    }
  }



  async function editUser(updatedUser: IUserTable) {
    try {
      if (!updatedUser.id) {
        return;
      }

      const response = await UserTableService.updateUser(
        updatedUser.id,
        updatedUser.name,
        updatedUser.email
      );

      setUsers(users.map((user) => (user.id === updatedUser.id ? response.data : user)));
      toast.success('User edited successfully')
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error('Error')
    }
  }



  return (
    <>
      <div>
        <AddUser onAdd={addUser} />
      </div>

      <main>
        <Users users={users} onDelete={deleteUser} onEdit={editUser} />
      </main>
    </>
  );
};

export default UserTable;
