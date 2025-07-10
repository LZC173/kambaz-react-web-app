import AssignmentControl from "./AssignmentControl";

import AssignmentLessonControlButtons from "./AssignmentLessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom"; 
import "../../styles.css";

export default function Assignments() {
  return (
    <div>
      <AssignmentControl /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> <FaCaretDown className="me-2 fs-4" />
            ASSIGNMENTS <AssignmentControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 mt-4" />
                <MdEditDocument className="me-2 fs-4 mt-4" />
                <div className="ms-2">
                  <div className="fw-bold">
                    <Link to="A1">A1</Link>
                  </div>
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <span className="text-secondary">Not available until May 6 at 12:00am</span>
                    <span className="mx-2">|</span>
                  </div>
                  <div className="text-secondary">
                    Due May 13 at 11:59pm <span className="mx-2">|</span> 100 pts
                  </div>
                </div>
                <div className="ms-auto">
                  <AssignmentLessonControlButtons />
                </div>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 mt-4" />
                <MdEditDocument className="me-2 fs-4 mt-4" />
                <div className="ms-2">
                  <div className="fw-bold">
                    <Link to="A2">A2</Link>
                  </div>
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <span className="text-secondary">Not available until May 13 at 12:00am</span>
                    <span className="mx-2">|</span>
                  </div>
                  <div className="text-secondary">
                    Due May 20 at 11:59pm <span className="mx-2">|</span> 100 pts
                  </div>
                </div>
                <div className="ms-auto">
                  <AssignmentLessonControlButtons />
                </div>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 mt-4" />
                <MdEditDocument className="me-2 fs-4 mt-4" />
                <div className="ms-2">
                  <div className="fw-bold">
                    <Link to="A3">A3</Link>
                  </div>
                  <div>
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-2">|</span>
                    <span className="text-secondary">Not available until May 20 at 12:00am</span>
                    <span className="mx-2">|</span>
                  </div>
                  <div className="text-secondary">
                    Due May 27 at 11:59pm <span className="mx-2">|</span> 100 pts
                  </div>
                </div>
                <div className="ms-auto">
                  <AssignmentLessonControlButtons />
                </div>
              </div>
            </ListGroup.Item>

          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
