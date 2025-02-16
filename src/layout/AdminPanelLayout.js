import React from 'react'
import AdminPanel from '../pages/AdminPanel'
import { Outlet } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const AdminPanelLayout = () => {
  const { editUser, loggedIn, currentUser, userData, setUserData } = useOutletContext();

  return (
    <div className='adminPanel'>
      <AdminPanel />
      <Outlet context={{ editUser, loggedIn, currentUser, userData, setUserData }}/>
    </div>
  )
}

export default AdminPanelLayout