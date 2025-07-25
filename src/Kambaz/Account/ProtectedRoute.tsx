// src/Kambaz/Account/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.coursesReducer.enrollments);
  const location = useLocation();

  // with out login ,go back to signin
  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" replace />;
  }

  // try to find cid
  const segments = location.pathname.split("/").filter(Boolean);
  const idx = segments.findIndex((seg) => seg === "Courses");
  if (idx >= 0 && segments.length > idx + 1) {
    const cid = segments[idx + 1];
    const isEnrolled = enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === cid
    );
    //only faculty can came in or enrollred 
    if (currentUser.role !== "FACULTY" && !isEnrolled) {
      return <Navigate to="/Kambaz/Dashboard" replace />;
    }
  }

  return children ?? <Outlet />;
}
