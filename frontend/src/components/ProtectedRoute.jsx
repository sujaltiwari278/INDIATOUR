import { Navigate } from "react-router-dom";

import FloatingButtons from "./FloatingButtons";

function ProtectedRoute({
  children,
}) {
  const token =
    localStorage.getItem(
      "token"
    );

  if (!token) {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <>
      {children}

      <FloatingButtons />
    </>
  );
}

export default ProtectedRoute;