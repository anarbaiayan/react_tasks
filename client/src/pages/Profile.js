import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/myButton.tsx';

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className='profile'>
          <h1>Profile</h1>
          <div className='profile_buttons'>
            <Button className='profile_btn' borderRadius='30px' bgcolor='black' onClick={() => navigate('info')} text='Info' />
          </div>
    </div>
  )
}

export default Profile