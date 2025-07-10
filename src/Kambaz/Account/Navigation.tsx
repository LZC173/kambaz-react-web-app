import { Link } from "react-router-dom";
import "../styles.css";
// use css that previouse defined 
export default function AccountNavigation() {
  return (
    <div className="list-group wd">
      <Link
        to="/Kambaz/Account/Signin"
        className="list-group-item active border-0"
      >
        Signin
      </Link>


      <Link
        to="/Kambaz/Account/Signup"
        className="list-group-item border-0 text-danger"
      >
        Signup
      </Link>

      <Link
        to="/Kambaz/Account/Profile"
        className="list-group-item border-0 text-danger"
      >
        Profile
      </Link>
    </div>
  );
}
