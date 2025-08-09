import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import * as client from "../../Account/client";
import { Form, FormControl } from "react-bootstrap";
export default function PeopleDetails() {
  const { uid} = useParams();
  const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
const [role, setRole] = useState("");
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
      const updatedUser = {
    ...user,
    firstName,
    lastName,
    email,
    role,
  };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(-1);
  };

  const navigate = useNavigate();
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setEmail(user.email); 
    setRole(user.role); 
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

    const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(-1);
  };

  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4 wd-name"> {user.firstName} {user.lastName} </div>
      <b>Roles:</b>           <span className="wd-roles">         {user.role}         </span> <br />
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
          <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={() => navigate(-1)}
              className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button> 
{!editing && (
  <FaPencil onClick={() => setEditing(true)}
    className="float-end fs-5 mt-2 wd-edit" />
)}

{editing && (
  <FaCheck onClick={() => saveUser()}
    className="float-end fs-5 mt-2 me-2 wd-save" />
)}


{!editing && (
  <div className="wd-name" onClick={() => setEditing(true)}>
    {user.firstName} {user.lastName}
  </div>
)}

        {user && editing && (
          <FormControl className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }}}/>)}


{editing && (
  <FormControl
    className="w-50 mb-2"
    type="email"
    placeholder="Enter email"      
    aria-label="Email"                 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
)}

{editing && (
  <Form.Select
    className="w-50 mb-2"
    aria-label="Select role"            
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
    <option value="" disabled>Select role</option> 
    <option value="ADMIN">Admin</option>
    <option value="FACULTY">Faculty</option>
    <option value="STUDENT">Student</option>
    <option value="USER">User</option>
  </Form.Select>
)}

 </div> ); }