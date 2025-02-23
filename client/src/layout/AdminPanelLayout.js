import React from 'react'
import AdminPanel from '../pages/AdminPanel'
import { Outlet } from 'react-router-dom'

const AdminPanelLayout = () => {

  return (
    <div className='adminPanel'>
      <AdminPanel />
      <Outlet />
    </div>
  )
}

export default AdminPanelLayout