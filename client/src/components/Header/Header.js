import Button from "../../UI/myButton"
import Register from "./Register"
import LogIn from "./LogIn"
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../index.tsx";
import { observer } from 'mobx-react-lite'
import { toast } from "react-toastify";

function Header() {
  const { store } = useContext(Context)
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openLogin, setOpenLogin] = useState(false);
  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleRegister = async (user) => {
    const role = await store.registration(user.name, user.email, user.password);
    handleClose();
    if (!store.isAuth) {
      navigate('/')
      toast.error('You are unauthorized')
    } else if (role === "admin") {
      navigate("/adminPanel");
      toast.success('Welcome admin')
    } else if (role === "user") {
      navigate("/profile");
      toast.success("Welcome new user")
    }
  };

  const handleLogin = async (user) => {
    const role = await store.login(user.email, user.password);
    handleCloseLogin();
    const lastPage = localStorage.getItem("lastPage");

    if (!store.isAuth) {
      toast.error("You are banned");
      navigate("/");
    } else if (lastPage !== '/') {
      localStorage.removeItem("lastPage");
      navigate(lastPage);
    } else if (role === "admin") {
      toast.success("Welcome back admin");
      navigate("/adminPanel");
    } else {
      toast.success("Welcome back user");
      navigate("/profile");
    }
  };

  const handleLogout = async () => {
    await store.logout()
    navigate('/')
    toast.success('Logged out')
  }


  return (
    <>
      <header>
        <p>Company</p>

        {store.isAuth ?
          <ul>
            <NavLink to='/'><li>Home</li></NavLink>
            <NavLink to='/profile'><li>Profile</li></NavLink>
            <NavLink to='userTable'><li>User Table</li></NavLink>
            {store.user.role === 'admin' ? <NavLink to='adminPanel'><li>Admin Panel</li></NavLink> : ''}

          </ul>
          : ''
        }



        {store.isAuth ? <Button className='reg_btn' borderRadius='30px' bgcolor='black' margin="20px" text="Log out" onClick={handleLogout} /> :
          <div>
            <Button className='reg_btn' borderRadius='30px' bgcolor='black' margin="20px" text="Log In" onClick={handleOpenLogin} />
            <Button className='reg_btn' borderRadius='30px' bgcolor='black' margin="20px" text="Register" onClick={handleOpen} />
          </div>
        }
      </header>


      <Register open={open} onClose={handleClose} onRegister={handleRegister} />
      <LogIn openLogin={openLogin} onClose={handleCloseLogin} onLogin={handleLogin} />
    </>
  )
}

export default observer(Header)