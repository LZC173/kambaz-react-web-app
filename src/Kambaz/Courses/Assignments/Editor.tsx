import { Form, Row, Col, Card, Badge, CloseButton, Button} from "react-bootstrap";
import { useParams } from "react-router-dom";
export default function AssignmentEditor() {
  const { aid } = useParams();
  return (
    <div className="container mt-3">
      <h4>Assignment Name</h4>
      <Form>

        <Form.Group className="mb-3" controlId="assignmentName">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" value={aid} />
        </Form.Group>


        <Form.Group className="mb-3" controlId="assignmentDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={12}
            defaultValue={`
            The assignment is available online. 
            Submit a link to the landing page of your Web application running on Netlify.
            The landing page should include the following:
            * Your full name and section
            * Links to each of the lab assignments
            * Link to the Kanbas application
            * Links to all relevant source code repositories

            The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="assignmentPoints">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={100} />
        </Form.Group>
      <Form.Group className="mb-3" controlId="assignmentGroup">
        <Form.Label>Assignment Group</Form.Label>
        <Form.Select>
          <option>ASSIGNMENTS</option>
        </Form.Select>
      </Form.Group>
        <Form.Group className="mb-3" controlId="Display Grade as">
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
          <Form.Select className="mb-3">
            <option>Online</option>
          </Form.Select>

          <strong>Online Entry Options</strong>
          <div className="ms-2">
            <Form.Check type="checkbox" id="text-entry" label="Text Entry" />
            <Form.Check type="checkbox" id="website-url" label="Website URL" defaultChecked />
            <Form.Check type="checkbox" id="media-recordings" label="Media Recordings" />
            <Form.Check type="checkbox" id="student-annotation" label="Student Annotation" />
            <Form.Check type="checkbox" id="file-uploads" label="File Uploads" />
          </div>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
  <Form.Label column sm={2}>Assign</Form.Label>
  <Col sm={10}>
    <Card className="p-3">

      <Card className="p-3">
        <Form.Group className="mb-3" controlId="assignTo">
          <Form.Label>Assign to</Form.Label>
          <div className="border rounded p-2 d-flex align-items-center" style={{ minHeight: "38px" }}>
            <Badge bg="light" text="dark" className="me-2 px-2 py-1 d-flex align-items-center">
              Everyone
              <CloseButton className="ms-2" style={{ fontSize: "0.6rem" }} />
            </Badge>
          </div>
        </Form.Group>
      </Card>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label>Due</Form.Label>
        <Form.Control type="date" defaultValue="2024-05-13" />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="availableFrom">
            <Form.Label>Available from</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-06" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="availableUntil">
            <Form.Label>Until</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-20" />
          </Form.Group>
        </Col>
      </Row>
    </Card>
  </Col>
</Form.Group>
      <Form.Group className="mb-3 text-end">
        <Button variant="light" className="me-2 border">
          Cancel
        </Button>
        <Button variant="danger">
          Save
        </Button>
      </Form.Group>
        </Form>
    </div>


  );
}
