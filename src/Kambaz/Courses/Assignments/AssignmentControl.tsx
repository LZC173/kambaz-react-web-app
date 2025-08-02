import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentControl() {
  const navigate = useNavigate();
  const { cid } = useParams<{ cid: string }>();

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <InputGroup className="w-50 mt-5 ms-1">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <Form.Control placeholder="Search..." />
      </InputGroup>
      <div className="mt-5 me-1 d-flex gap-2">
        <Button variant="light" className="border">
          <FaPlus className="me-1" />
          Group
        </Button>
        <Button
          variant="danger"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
        >
          <FaPlus className="me-1" />
          Assignment
        </Button>
      </div>
    </div>
  );
}
