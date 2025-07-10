import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="container mt-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Sign up</h1>
      <Form><Form.Control
          id="wd-username"
          placeholder="Username"
          className="mb-3"/>
        <Form.Control
          id="wd-password"
          placeholder="Password"
          type="password"
          className="mb-3"
        />
        <Link
          id="wd-signup-btn"
          to="/Kambaz/Account/Profile"
          className="btn btn-primary w-100 mb-3"
        >
          Sign up
        </Link>

        <div className="text-center">
          <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
            Already have an account? Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
}
