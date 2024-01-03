import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import { RootState } from "../redux/store";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users);
  return isLoggedIn && userData && userData.isAdmin? (<Login pathName={location.pathname} />) : (<Outlet />);
}

export default ProtectedRoute;