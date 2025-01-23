import AddUser from "./components/AddUser";
import Users from "./components/Users";
import React, { useState } from "react";

function App() {

  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ]);

  const addUser = (user) => {
    const newUser = { id: users.length + 1, ...user };
    setUsers([...users, newUser]);
  }

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== parseInt(id)))
  }

  const editUser = (editUser) => {
    setUsers(users.map(user => 
      user.id === parseInt(editUser.id) ? {...user, ...editUser} : user
    ))
  }

  return (
    <div>
      <div>
        <AddUser onAdd={addUser} />
      </div>
      
      <main>
        <Users users={users} onDelete={deleteUser} onEdit={editUser}/>
      </main>

      
    </div>
  );
}


export default App;
