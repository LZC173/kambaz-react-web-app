import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div className="container mt-3" id="wd-profile-screen">
      <h3>Profile</h3>
      <Form>
        <Form.Group className="mb-2">
          <Form.Control defaultValue="alice" placeholder="username" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control defaultValue="123" placeholder="password" type="password" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control defaultValue="Alice" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control defaultValue="Wonderland" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control defaultValue="2000-01-01" type="date" />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Control defaultValue="alice@wonderland.com" type="email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Select defaultValue="USER">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>
        <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100">
          Signout
        </Link>
      </Form>
    </div>
  );
}