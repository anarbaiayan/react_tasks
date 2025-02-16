import React from 'react'
import { useOutletContext } from 'react-router-dom';

const UserInfo = () => {
  const { loggedIn, currentUser } = useOutletContext();

  if (!loggedIn || !currentUser) {
    return <div className='user_info'>You are not logged in.</div>;
  }

  return (
    <div className='user_info'>
      <div>
        <p>Email: {currentUser.email}</p>
        <p>Name: {currentUser.name}</p>
        <p>Role: {currentUser.role}</p>
      </div>

    </div>
  );
}

export default UserInfo