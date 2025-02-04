import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import UserTable from "./pages/UserTable";
import RootLayout from "./layout/RootLayout";
import ProfileLayout from "./layout/ProfileLayout";
import UserInfo from "./components/UserInfo";
import UserImg from "./components/UserImg";
import NotFound from "./components/NotFound";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<ProfileLayout />}>
          <Route path="info" element={<UserInfo />}/>
          <Route path="userImg" element={<UserImg />}/>
        </Route>
        <Route path="userTable" element={<UserTable />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}


export default App;
