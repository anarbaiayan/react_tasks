import Button from "../../UI/myButton"
import Register from "./Register"
import LogIn from "./LogIn"
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header({ userData, setUserData, setLoggedIn, loggedIn, setCurrentUser, currentUser }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

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
      setCurrentUser(existingUser);
      navigate('/profile', { replace: true })
      console.log(userData)
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setSuccess("You logged out successfully");
    setShowSuccessNotification(true);
    setTimeout(() => setShowSuccessNotification(false), 3000);
    navigate('/', { replace: true })
  }


  return (
    <>
      <header>
        <p>Company</p>

        {loggedIn ?
          <ul>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/profile'><li>Profile</li></NavLink>
            <NavLink to='userTable'><li>User Table</li></NavLink>
            {currentUser.role === 'admin' ? <NavLink to='adminPanel'><li>Admin Panel</li></NavLink> : ''}

          </ul>
          : ''
        }



        {loggedIn ? <Button className='reg_btn' borderRadius='30px' bgcolor='black' margin="20px" text="Log out" onClick={handleLogout} /> :
          <div>
            <Button className='reg_btn' borderRadius='30px' bgcolor='black' margin="20px" text="Log In" onClick={handleOpenLogin} />
            <Button className='reg_btn' borderRadius='30px' bgcolor='black' margin="20px" text="Register" onClick={handleOpen} />
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

      <Register userData={userData} open={open} onClose={handleClose} onRegister={handleRegister} />
      <LogIn openLogin={openLogin} onClose={handleCloseLogin} onLogin={handleLogin} />
    </>
  )
}

export default Header