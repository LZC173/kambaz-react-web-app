import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles.css";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  return (
    <div className="list-group wd">

      {!currentUser && (
        <>
          <Link
            to="/Kambaz/Account/Signin"
            className={
              "list-group-item border-0" +
              (pathname.endsWith("/Signin") ? " active" : "")
            }
            id="wd-nav-signin"
          >
            Signin
          </Link>

          <Link
            to="/Kambaz/Account/Signup"
            className={
              "list-group-item border-0" +
              (pathname.endsWith("/Signup") ? " active" : "")
            }
            id="wd-nav-signup"
          >
            Signup
          </Link>
        </>
      )}



      {currentUser && (
        <Link
          to="/Kambaz/Account/Profile"
          className={
            "list-group-item border-0" +
            (pathname.endsWith("/Profile") ? " active" : "")
          }
          id="wd-nav-profile"
        >
          Profile
        </Link>
      )}
    </div>
  );
}