import React from 'react'
import Button from '../../UI/myButton'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='not_found'>
      <h2>404 | Page not found</h2>
      <Button onClick={() => navigate('/')} margin="20px" className='profile_btn' borderRadius='30px' bgcolor='black' text="Go to Home page" />
    </div>
  )
}

export default NotFound