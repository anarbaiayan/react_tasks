import React from 'react'
import Profile from '../pages/Profile'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {

  return (
    <div>
      <Profile />
      <Outlet />
    </div>
  )
}

export default ProfileLayout