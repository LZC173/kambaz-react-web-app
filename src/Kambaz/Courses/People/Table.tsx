import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import PeopleDetails from "./Details";
import * as courseClient from "../client";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string | number;
};

export default function PeopleTable({ users: usersProp = [] }: { users?: User[] }) {

  //two ways of getting data, for user page ,get data through props as we did inclass
  // fetch data directly if we are at sidebar of course people.page
  const { cid } = useParams();
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);

  const users = usersProp.length ? usersProp : fetchedUsers;

  useEffect(() => {

    if (usersProp.length) return;
    if (!cid) return;

    let cancelled = false;
    (async () => {
      try {
        const data = await courseClient.findUsersForCourse(cid);
        if (!cancelled) setFetchedUsers(data ?? []);
      } catch (err) {
        console.error("findUsersForCourse failed:", err);
        if (!cancelled) setFetchedUsers([]);
      }
    })();

    return () => { cancelled = true; };
  }, [cid, usersProp.length]);

  return (
    <div id="wd-people-table">

      <PeopleDetails />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Section</th>
            <th>Role</th><th>Last Activity</th><th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={6} className="text-secondary">No enrolled users.</td></tr>
          ) : users.map((user) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <Link to={`/Kambaz/Account/Users/${user._id}`} className="text-decoration-none">
                  <span className="wd-first-name">{user.firstName || ""}</span>{" "}
                  <span className="wd-last-name">{user.lastName || ""}</span>
                </Link>
              </td>
              <td className="wd-login-id">{user.loginId || ""}</td>
              <td className="wd-section">{user.section || ""}</td>
              <td className="wd-role">{user.role || ""}</td>
              <td className="wd-last-activity">{user.lastActivity || ""}</td>
              <td className="wd-total-activity">{user.totalActivity ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
