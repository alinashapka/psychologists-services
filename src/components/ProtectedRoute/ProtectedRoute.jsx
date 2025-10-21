import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated
  const isAuthenticated = () => {
    // Placeholder - replace with actual auth check
    const user = localStorage.getItem("user");
    return !!user;
  };

  if (!isAuthenticated()) {
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
