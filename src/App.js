import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserTable from "./pages/UserTable";
import RootLayout from "./layout/RootLayout";
import ProfileLayout from "./layout/ProfileLayout";
import UserInfo from "./components/Profile/UserInfo";
import UserImg from "./components/Profile/UserImg";
import NotFound from "./components/NotFound/NotFound";
import AdminPanelLayout from "./layout/AdminPanelLayout";
import UserRoleChange from "./components/AdminPanel/UserRoleChange"
import UserProfileEdit from "./components/AdminPanel/UserProfileEdit";
import UserBan from "./components/AdminPanel/UserBan";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfileLayout />}>
          <Route path="info" element={<UserInfo />} />
          <Route path="userImg" element={<UserImg />} />
        </Route>
        <Route path="userTable" element={<UserTable />} />
        <Route path="adminPanel" element={<AdminPanelLayout />}>
          <Route path="" element={<UserRoleChange />} />
          <Route path="profileEditing" element={<UserProfileEdit />} />
          <Route path="userBan" element={<UserBan />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}


export default App;
