import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserTable from "./pages/UserTable";
import RootLayout from "./layout/RootLayout";
import ProfileLayout from "./layout/ProfileLayout";
import UserInfo from "./components/Profile/UserInfo";
import NotFound from "./components/NotFound/NotFound";
import AdminPanelLayout from "./layout/AdminPanelLayout";
import UserRoleChange from "./components/AdminPanel/UserRoleChange.tsx"
import UserProfileEdit from "./components/AdminPanel/UserProfileEdit.tsx";
import UserBan from "./components/AdminPanel/UserBan.tsx";
import AllUsers from './components/AdminPanel/AllUsers.tsx'
import { useContext, useEffect } from "react";
import { Context } from "./index.tsx";
import { observer } from 'mobx-react-lite'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { store } = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfileLayout />}>
          <Route path="info" element={<UserInfo />} />
        </Route>
        <Route path="userTable" element={<UserTable />} />
        <Route path="adminPanel" element={<AdminPanelLayout />}>
          <Route path="" element={<UserRoleChange />} />
          <Route path="profileEditing" element={<UserProfileEdit />} />
          <Route path="userBan" element={<UserBan />} />
          <Route path="allUsers" element={<AllUsers />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
      <RouterProvider router={router} />
    </>
  );
}


export default observer(App);
