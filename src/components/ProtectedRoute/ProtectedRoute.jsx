import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoading, selectIsLoggedIn } from "../../redux/auth/selectors";
import Loader from "../Loader/Loader";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    // Redirect to home with state indicating auth is needed
    return (
      <Navigate
        to="/"
        state={{ requiresAuth: true, from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
