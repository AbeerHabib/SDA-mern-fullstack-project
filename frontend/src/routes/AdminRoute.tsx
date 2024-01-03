import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import { RootState } from "../redux/store";

const AdminRoute = () => {
  const location = useLocation();
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users);
  return isLoggedIn && userData && userData.isAdmin? (<Outlet />) : (<Login pathName={location.pathname} />);
}

export default AdminRoute;