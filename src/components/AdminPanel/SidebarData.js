import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BlockIcon from '@mui/icons-material/Block';

export const SidebarData = [
  {
    title: "Users",
    icon: <AccountCircleIcon />,
    link: ""
  },
  {
    title: "Profile Edit",
    icon: <ManageAccountsIcon />,
    link: "profileEditing"
  },
  {
    title: "Ban User",
    icon: <BlockIcon />,
    link: "userBan"
  }
]
