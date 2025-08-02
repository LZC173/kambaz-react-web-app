// src/Kambaz/Courses/Assignments/index.tsx
import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ListGroup, Spinner } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaTrash } from "react-icons/fa";
import { MdEditDocument } from "react-icons/md";

import AssignmentHeaderButtons from "./AssignmentHeaderButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";

import { useSelector, useDispatch } from "react-redux";
import {
  setAssignments,
  deleteAssignment as deleteAssignmentAction,
} from "./reducer";
import * as assignmentsClient from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const canEdit = currentUser?.role === "FACULTY";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = async () => {
    if (!cid) return;
    setLoading(true);
    setError(null);
    try {
      const data = await assignmentsClient.findAssignmentsForCourse(cid);
      dispatch(setAssignments(data));
    } catch (e: any) {
      setError(e?.message || "Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const handleDelete = async (assignmentId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this assignment? This action cannot be undone."
      )
    ) {
      return;
    }
    try {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignmentAction(assignmentId));
    } catch (e) {
      console.error("Failed to delete assignment", e);
    }
  };

  const filtered = useMemo(
    () => assignments.filter((a: any) => a.course === cid),
    [assignments, cid]
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div style={{ flex: 1 }}>
          <h3 className="m-0">Assignments</h3>
        </div>
        {canEdit && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Assignments/new`)
              }
            >
              + Assignment
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="mb-3">
          <Spinner animation="border" size="sm" /> Loading assignments...
        </div>
      )}
      {error && <div className="text-danger mb-3">{error}</div>}

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <FaCaretDown className="me-2 fs-4" />
            ASSIGNMENTS <AssignmentHeaderButtons />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {filtered.map((a: any) => (
              <ListGroup.Item
                key={a._id}
                className="wd-lesson p-3 ps-1 d-flex align-items-start"
              >
                <BsGripVertical className="me-2 fs-3 mt-4" />
                <MdEditDocument className="me-2 fs-4 mt-4" />

                <div className="ms-2 flex-grow-1">
                  <div className="fw-bold">
                    {canEdit ? (
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${a._id}`}
                      >
                        {a.title || a._id}
                      </Link>
                    ) : (
                      <span>{a.title || a._id}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-danger">{a.modulesText}</span>
                    <span className="mx-2">|</span>
                    <span className="text-secondary">{a.availableText}</span>
                    <span className="mx-2">|</span>
                  </div>
                  <div className="text-secondary">
                    {a.dueDateText} <span className="mx-2">|</span> {a.points}{" "}
                    pts
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

            {!loading && filtered.length === 0 && (
              <div className="p-3 text-muted">No assignments yet.</div>
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
