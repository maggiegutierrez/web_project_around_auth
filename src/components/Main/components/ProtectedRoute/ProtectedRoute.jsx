import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../contexts/AppContexts";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
