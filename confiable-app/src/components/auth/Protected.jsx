import { Navigate } from "react-router-dom";

const isAuthenticated = () => true

export default function Protected({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
