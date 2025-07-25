import {
  Modal,
  Form,
  Row,
  Col,
  Badge,
  CloseButton,
  Button,
} from "react-bootstrap";


type AssignmentEditorProps = {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  id: string;
  setId: (id: string) => void;
  modulesText: string;
  setModulesText: (text: string) => void;
  availableFrom: string;
  setAvailableFrom: (date: string) => void;
  availableUntil: string;
  setAvailableUntil: (date: string) => void;
  dueDate: string;
  setDueDate: (date: string) => void;
  points: number;
  setPoints: (pts: number) => void;
  saveAssignment: () => void;
};

export default function AssignmentEditor({
  show,
  handleClose,
  dialogTitle,
  id,
  setId,
  modulesText,
  setModulesText,
  availableFrom,
  setAvailableFrom,
  availableUntil,
  setAvailableUntil,
  dueDate,
  setDueDate,
  points,
  setPoints,
  saveAssignment,
}: AssignmentEditorProps) {


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
            <Form.Label>Description</Form.Label>
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
                <Form.Check type="checkbox" id="media-recordings" label="Media Recordings" />
                <Form.Check type="checkbox" id="student-annotation" label="Student Annotation" />
                <Form.Check type="checkbox" id="file-uploads" label="File Uploads" />
              </div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
              Assign
            </Form.Label>
            <Col sm={10}>
              <div className="border rounded p-2 mb-3 d-flex align-items-center" style={{ minHeight: "38px" }}>
                <Badge bg="light" text="dark" className="me-2 d-flex align-items-center">
                  Everyone
                  <CloseButton className="ms-2" style={{ fontSize: "0.6rem" }} />
                </Badge>
              </div>

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
        </Form>
      </Modal.Body>

      <Modal.Footer className="text-end">
        <Button variant="light" className="me-2" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            saveAssignment();
            handleClose();
          }}
        >
          {dialogTitle.includes("Edit") ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
