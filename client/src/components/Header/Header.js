import Button from "../../UI/myButton.tsx"
import Register from "./Register"
import LogIn from "./LogIn"
import React, { useContext, useState, useEffect } from "react";
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

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (store.isAuth && userRole) {
      const lastPage = localStorage.getItem("lastPage");
      if (lastPage) {
        localStorage.removeItem("lastPage");
        navigate(lastPage);
      } else if (userRole === "admin") {
        navigate("/adminPanel");
        toast.success("Welcome admin");
      } else {
        navigate("/profile");
        toast.success("Welcome user");
      }
    }
  }, [store.isAuth, userRole, navigate]);

  const handleRegister = async (user) => {
    const role = await store.registration(user.name, user.email, user.password);
    setUserRole(role)
    handleClose();
  };

  const handleLogin = async (user) => {
    const role = await store.login(user.email, user.password);
    setUserRole(role)
    handleCloseLogin();
    if (!store.isAuth) {
      toast.error("You are banned");
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await store.logout()
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