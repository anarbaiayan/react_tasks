import React from 'react'
import { SidebarData } from "../components/AdminPanel/SidebarData"
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="sidebar">
        <ul className='sidebarList'>
          {SidebarData.map((val, key) => {
            return (
              <li
                id={window.location.pathname === "/adminPanel/" + val.link ? "sidebarActive" : ""}
                className='sidebarRow'
                key={key}
                onClick={() => navigate(val.link)} >
                <div id="sidebarIcon">{val.icon}</div>
                <div id="sidebarTitle">{val.title}</div>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  )
}

export default AdminPanel