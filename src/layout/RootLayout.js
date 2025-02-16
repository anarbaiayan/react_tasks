import React, { useState } from "react";
import Header from "../components/Header/Header"
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);

  const [userData, setUserData] = useState([
    {id: 1, name: 'test', email: "test@mail.ru", password: '12345678', role: "admin", ban: false },
    {id: 2, name: 'test2', email: "test2@mail.ru", password: '11111111', role: "user", ban: false }
  ]);

  const editUser = (editUser) => {
    setUserData(userData.map(user =>
      user.id === parseInt(editUser.id) ? { ...user, ...editUser } : user
    ))
  }

  return (
    <div>
      <Header userData={userData} setUserData={setUserData} loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet context={{editUser, loggedIn, currentUser, userData, setUserData }} />
    </div>
  )
}

export default RootLayout