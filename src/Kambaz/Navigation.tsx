import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid} from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { MdScience } from "react-icons/md";

export default function KambazNavigation() {
  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      {/* Northeastern Link */}
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>

      {/* Account */}
      <ListGroup.Item
        to="/Kambaz/Account"
        as={Link}
        id="wd-account-link"
        className="text-center border-0 bg-black text-white"
      >
        <FaRegCircleUser className="fs-1 text-white" /><br />
        Account
      </ListGroup.Item>

      {/* Dashboard */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        id="wd-dashboard-link"
        className="text-center border-0 bg-black text-white"
      >
        <AiOutlineDashboard className="fs-1 text-danger" /><br />
        Dashboard
      </ListGroup.Item>

      {/* Courses */}
      <ListGroup.Item
        to="/Kambaz/Dashboard"
        as={Link}
        id="wd-course-link"
        className="text-center border-0 bg-black text-white"
      >
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses
      </ListGroup.Item>

      {/* Calendar */}
      <ListGroup.Item
        to="/Kambaz/Calendar"
        as={Link}
        id="wd-calendar-link"
        className="text-center border-0 bg-black text-white"
      >
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar
      </ListGroup.Item>

      {/* Inbox */}
      <ListGroup.Item
        to="/Kambaz/Inbox"
        as={Link}
        id="wd-inbox-link"
        className="text-center border-0 bg-black text-white"
      >
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox
      </ListGroup.Item>

      {/* Labs */}
      <ListGroup.Item
        to="/Labs"
        as={Link}
        id="wd-labs-link"
        className="text-center border-0 bg-black text-white"
      >
        <MdScience className="fs-1 text-danger" /><br />
        Labs
      </ListGroup.Item>
    </ListGroup>
  );
}
