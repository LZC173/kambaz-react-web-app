// src/Kambaz/Courses/Assignments/AssignmentEditor.tsx
import { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Badge,
  CloseButton,
  Button,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  updateAssignment as updateAssignmentAction,
  addAssignment,
  deleteAssignment as deleteAssignmentAction,
  setAssignmentField,
} from "./reducer";
import * as assignmentsClient from "./client";
import type { Assignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (s: any) => s.assignmentsReducer.assignments
  ) as Assignment[];
  const isNew = aid === "new";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentIdRef = useRef<string>(isNew ? "" : aid || "");
  const assignment = assignments.find((a) => a._id === currentIdRef.current);

  useEffect(() => {
    if (!cid) return;

    if (isNew) {
      // only create draft once
      if (currentIdRef.current) {
        return;
      }
      const draftId = crypto.randomUUID();
      currentIdRef.current = draftId;
      dispatch(
        addAssignment({
          _id: draftId,
          title: "",
          course: cid,
          modulesText: "",
          availableFrom: "",
          availableUntil: "",
          dueDate: "",
          points: 0,
        })
      );
      return;
    }

    if (!aid) return;

    if (assignment) {
      currentIdRef.current = assignment._id;
      if (!assignment.title) {
        dispatch(
          updateAssignmentAction({
            _id: assignment._id,
            title: assignment._id,
          })
        );
      }
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetched = await assignmentsClient.getAssignment(aid!);
        dispatch(addAssignment(fetched));
        currentIdRef.current = fetched._id;
      } catch (e: any) {
        setError(e?.message || "Failed to load assignment");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [aid, isNew, cid, assignment, dispatch]);

  if (loading) {
    return <div>Loading assignment...</div>;
  }

  if (!assignment) {
    return <div className="text-danger">Assignment not found.</div>;
  }

  const changeField = (
    field: keyof Omit<Assignment, "_id" | "availableText" | "dueDateText">,
    value: any
  ) => {
    dispatch(setAssignmentField({ _id: assignment._id, field, value }));
  };

  const handleSave = async () => {
    if (!cid) return;

    try {
      if (isNew) {
        // create new on backend, remove draft, add real
        const created = await assignmentsClient.createAssignmentForCourse(
          cid,
          {
            title: assignment.title || assignment._id,
            course: cid,
            modulesText: assignment.modulesText,
            availableFrom: assignment.availableFrom,
            availableUntil: assignment.availableUntil,
            dueDate: assignment.dueDate,
            points: assignment.points,
          }
        );
        dispatch(deleteAssignmentAction(assignment._id)); // remove draft
        dispatch(addAssignment(created));
      } else {
        const updated = await assignmentsClient.updateAssignment({
          _id: assignment._id,
          title: assignment.title || assignment._id,
          course: cid,
          modulesText: assignment.modulesText,
          availableFrom: assignment.availableFrom,
          availableUntil: assignment.availableUntil,
          dueDate: assignment.dueDate,
          points: assignment.points,
        });
        dispatch(updateAssignmentAction(updated));
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (e: any) {
      console.error("save failed", e);
      setError("Failed to save assignment");
    }
  };

  return (
    <div className="container mt-3">
      <h4>{isNew ? "New Assignment" : assignment.title || assignment._id}</h4>
      {error && <div className="text-danger mb-2">{error}</div>}
      <Form>
        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.title}
            onChange={(e) => changeField("title", e.target.value)}
            placeholder="Assignment Title"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label>Description (modulesText)</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={assignment.modulesText}
            onChange={(e) => changeField("modulesText", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="assignmentPoints">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) =>
              changeField("points", Number(e.target.value) || 0)
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="assignmentGroup">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select>
            <option>ASSIGNMENTS</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="displayGrade">
          <Form.Label>Display Grade as</Form.Label>
          <Form.Select>
            <option>Percentage</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="submissionType">
          <Form.Label column sm={3}>
            Submission Type
          </Form.Label>
          <Col sm={9}>
            <Form.Select className="mb-2">
              <option>Online</option>
            </Form.Select>
            <strong>Online Entry Options</strong>
            <div className="ms-2">
              <Form.Check type="checkbox" id="text-entry" label="Text Entry" />
              <Form.Check
                type="checkbox"
                id="website-url"
                label="Website URL"
                defaultChecked
              />
              <Form.Check
                type="checkbox"
                id="media-recordings"
                label="Media Recordings"
              />
              <Form.Check
                type="checkbox"
                id="student-annotation"
                label="Student Annotation"
              />
              <Form.Check
                type="checkbox"
                id="file-uploads"
                label="File Uploads"
              />
            </div>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Assign
          </Form.Label>
          <Col sm={10}>
            <Card className="p-3 mb-3">
              <Form.Group className="mb-0" controlId="assignTo">
                <Form.Label>Assign to</Form.Label>
                <div
                  className="border rounded p-2 d-flex align-items-center"
                  style={{ minHeight: "38px" }}
                >
                  <Badge
                    bg="light"
                    text="dark"
                    className="me-2 d-flex align-items-center"
                  >
                    Everyone
                    <CloseButton
                      className="ms-2"
                      style={{ fontSize: "0.6rem" }}
                    />
                  </Badge>
                </div>
              </Form.Group>
            </Card>

            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Due</Form.Label>
              <Form.Control
                type="date"
                value={assignment.dueDate}
                onChange={(e) => changeField("dueDate", e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="availableFrom">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableFrom}
                    onChange={(e) =>
                      changeField("availableFrom", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="availableUntil">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.availableUntil}
                    onChange={(e) =>
                      changeField("availableUntil", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3 text-end">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="light" className="me-2 border">
              Cancel
            </Button>
          </Link>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
