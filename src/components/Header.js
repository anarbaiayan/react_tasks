import Button from "../UI/myButton"
import Register from "./Register"
import LogIn from "./LogIn"
import React, { useState } from "react";

function Header({ setLoggedIn, loggedIn }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const [userData, setUserData] = useState([
    { email: "test@mail.ru", password: '12345678' },
    { email: "test2@mail.ru", password: '11111111' }
  ]);

  const [error, setError] = useState("");
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const [success, setSuccess] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleRegister = (user) => {
    const emailExists = userData.some((u) => u.email === user.email);
    if (emailExists) {
      setError("Email already exists");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    } else {
      setSuccess("You registered successfully");
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      setUserData([...userData, user]);
      setError("");
      handleClose();
      handleOpenLogin();
    }
  };

  const handleLogin = (user) => {
    const existingUser = userData.find((u) => u.email === user.email);
    if (!existingUser) {
      setError("There is no user with this email");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    } else if (existingUser.password !== user.password) {
      setError("Incorrect password");
      setShowErrorNotification(true);
      setTimeout(() => setShowErrorNotification(false), 3000);
    } else {
      setSuccess("You logged in successfully");
      setShowSuccessNotification(true);
      setTimeout(() => setShowSuccessNotification(false), 3000);
      handleCloseLogin()
      setLoggedIn(true)
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setSuccess("You logged out successfully");
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
  }


  return (
    <>
      <header>
        <p>Company</p>

        {loggedIn ? <Button margin="20px" text="Log out" onClick={handleLogout} /> :
          <div>
            <Button margin="20px" text="Log In" onClick={handleOpenLogin} />
            <Button margin="20px" text="Register" onClick={handleOpen} />
          </div>
        }

      </header>

      {showErrorNotification && (
        <div className="error-popup">
          {error}
        </div>
      )}

      {showSuccessNotification && (
        <div className="success-popup">
          {success}
        </div>
      )}

      <Register open={open} onClose={handleClose} onRegister={handleRegister} />
      <LogIn openLogin={openLogin} onClose={handleCloseLogin} onLogin={handleLogin} />
    </>
  )
}

export default Header