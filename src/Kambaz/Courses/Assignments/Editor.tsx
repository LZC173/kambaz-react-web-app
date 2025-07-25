
import  { useState } from "react";
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
import * as db from "../../Database";
import { updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const assignments = useSelector((s: any) => s.assignmentsReducer.assignments);
  const existing =
    assignments.find((a: any) => a._id === aid) ||
    db.assignments.find((a) => a._id === aid)!;

 
  const [id, setId] = useState(existing._id);
  const [modulesText, setModulesText] = useState(existing.modulesText);
  const [availableFrom, setAvailableFrom] = useState(existing.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(
    existing.availableUntil
  );
  const [dueDate, setDueDate] = useState(existing.dueDate);
  const [points, setPoints] = useState(existing.points);

  // ///handle save ,will disptach and update assignment!!!!!!!!!!!!!
  const handleSave = () => {
    dispatch(
      updateAssignment({
        originalId: existing._id, 
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
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div className="container mt-3">
      <h4>{existing.title}</h4>
      <Form>
        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label>Description (modulesText)</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            value={modulesText}
            onChange={(e) => setModulesText(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="assignmentPoints">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
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
              <Form.Check type="checkbox" id="file-uploads" label="File Uploads" />
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
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="availableFrom">
                  <Form.Label>Available from</Form.Label>
                  <Form.Control
                    type="date"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="availableUntil">
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
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
