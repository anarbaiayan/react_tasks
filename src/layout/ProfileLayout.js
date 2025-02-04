import React from 'react'
import Profile from '../pages/Profile'
import { Outlet } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

const ProfileLayout = () => {
  const { loggedIn, currentUser, userData, setUserData } = useOutletContext();

  return (
    <div>
      <Profile />
      <Outlet context={{ loggedIn, currentUser, userData, setUserData }}/>
    </div>
  )
}

export default ProfileLayout