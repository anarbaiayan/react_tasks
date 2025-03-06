import React, { useEffect, useState } from "react";
import AddUser from "../components/UserTable/AddUser";
import Users from "../components/UserTable/Users.tsx";
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
        id: user._id,
        name: user.name,
        email: user.email,
      }));
      setUsers(usersData);
    } catch (error) {
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
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter((user) => user.id !== id);
        return updatedUsers;
      });

      const response = await UserTableService.deleteUser(id);
      if (response && response.status === 200) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Error");
      fetchUsers();
    }
  }

  async function deleteUsers(ids: string[]) {
    if (ids.length === 0) return;

    try {
      setUsers((prevUsers) => prevUsers.filter((user) => !ids.includes(user.id)));
      const response = await UserTableService.deleteUsers(ids);
      if (response && response.status === 200) {
        toast.success(`Deleted ${ids.length} users successfully`);
      } else {
        toast.error("Failed to delete some users");
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Error deleting users");
      fetchUsers();
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

      setUsers(users.map((user) => (user.id === updatedUser.id ? {...response.data, id: response.data?._id} : user)));
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
        <Users users={users} setUsers={setUsers} onDelete={deleteUser} onDeleteUsers={deleteUsers} onEdit={editUser} />
      </main>
    </>
  );
};

export default UserTable;
