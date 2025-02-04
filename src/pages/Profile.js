import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/myButton'

const Profile = () => {
  const navigate = useNavigate()
  const {loggedIn} = useOutletContext();
  return (
    <div className='profile'>
      {loggedIn ?
        <>
          <h1>Profile</h1>
          <div className='profile_buttons'>
            <Button className='profile_btn' borderRadius='30px' bgcolor='black' onClick={() => navigate('info')} text='Info' />
            <Button className='profile_btn' borderRadius='30px' bgcolor='black' onClick={() => navigate('userImg')} text='Change Avatar' />
          </div>
        </>

        : <h1>Log in</h1>}
    </div>
  )
}

export default Profile