import React, { useState } from "react";
import Header from "../components/Header"
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);

  const [userData, setUserData] = useState([
    { name: 'test', email: "test@mail.ru", password: '12345678' },
    { name: 'test2', email: "test2@mail.ru", password: '11111111' }
  ]);

  return (
    <div>
      <Header userData={userData} setUserData={setUserData} loggedIn={loggedIn} setLoggedIn={setLoggedIn} setCurrentUser={setCurrentUser} />
      <Outlet context={{ loggedIn, currentUser, userData, setUserData }} />
    </div>
  )
}

export default RootLayout