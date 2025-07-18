import AssignmentControl from "./AssignmentControl";

import AssignmentLessonControlButtons from "./AssignmentLessonControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";
import { Link ,useParams} from "react-router-dom"; 
import * as db from "../../Database";
import "../../styles.css";

// i Made change to json data because current json data lack aviliable time and bunch of things.
//so I add them to json data 
export default function Assignments() {
 const { cid }        = useParams<{ cid: string }>(); 
 const assignments    = db.assignments;
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
            {assignments .filter(a => a.course === cid).map(a => (
            <ListGroup.Item   key={a._id} className="wd-lesson p-3 ps-1">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 mt-4" />
                <MdEditDocument className="me-2 fs-4 mt-4" />
                <div className="ms-2">
                  <div className="fw-bold">
                  <Link to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}>
                           {a._id}
                  </Link>
                  </div>
                  <div>
                    <span className="text-danger">{a.modulesText}</span>
                    <span className="mx-2">|</span>
                    <span className="text-secondary">{a.availableText}</span>
                    <span className="mx-2">|</span>
                  </div>
                  <div className="text-secondary">
                    {a.dueDateText} <span className="mx-2">|</span> {a.points} pts
                  </div>
                </div>
                <div className="ms-auto">
                  <AssignmentLessonControlButtons />
                </div>
              </div>
            </ListGroup.Item>
          ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
