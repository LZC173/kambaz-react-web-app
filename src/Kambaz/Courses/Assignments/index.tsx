// src/Kambaz/Courses/Assignments/index.tsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

import AssignmentControl from "./AssignmentControl";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentHeaderButtons from "./AssignmentHeaderButtons";

import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const canEdit = currentUser.role === "FACULTY";
  /// only faculty can edit , so i wrote this 

  const [id, setId] = useState("");
  const [modulesText, setModulesText] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState(0);


  // a window appear before delete 
  const handleDelete = (assignmentId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this assignment? This action cannot be undone."
      )
    ) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  return (
    <div>
      {canEdit && (
        <AssignmentControl
          id={id}
          setId={setId}
          modulesText={modulesText}
          setModulesText={setModulesText}
          availableFrom={availableFrom}
          setAvailableFrom={setAvailableFrom}
          availableUntil={availableUntil}
          setAvailableUntil={setAvailableUntil}
          dueDate={dueDate}
          setDueDate={setDueDate}
          points={points}
          setPoints={setPoints}
          saveAssignment={() => {
            dispatch(
              addAssignment({
                _id: id,
                title: id,
                course: cid!,
                modulesText,
                availableFrom,
                availableUntil,
                dueDate,
                points,
              })
            );
            setId("");
            setModulesText("");
            setAvailableFrom("");
            setAvailableUntil("");
            setDueDate("");
            setPoints(0);
          }}
        />
      )}

      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaCaretDown className="me-2 fs-4" />
            ASSIGNMENTS <AssignmentHeaderButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((a: any) => a.course === cid)
              .map((a: any) => (
                <ListGroup.Item
                  key={a._id}
                  className="wd-lesson p-3 ps-1 d-flex align-items-start"
                >
                  <BsGripVertical className="me-2 fs-3 mt-4" />
                  <MdEditDocument className="me-2 fs-4 mt-4" />

                  <div className="ms-2 flex-grow-1">
                    <div className="fw-bold">
                      {canEdit ? (
                        <Link to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}>
                          {a._id}
                        </Link>
                      ) : (
                        <span>{a._id}</span>
                      )}
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

                  <div className="ms-auto d-flex align-items-center gap-2">
                    <AssignmentControlButtons />
                    {canEdit && (
                      <FaTrash
                        className="text-danger fs-5"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(a._id)}
                      />
                    )}
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
