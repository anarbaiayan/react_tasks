import React, {useContext} from 'react'
import { Context } from '../../index.tsx';

const UserInfo = () => {
  const {store} = useContext(Context)

  if (!store.isAuth) {
    return <div className='user_info'>You are not logged in.</div>;
  }

  return (
    <div className='user_info'>
      <div>
        <p>Email: {store.user.email}</p>
        <p>Name: {store.user.name}</p>
        <p>Role: {store.user.role}</p>
      </div>

    </div>
  );
}

export default UserInfo