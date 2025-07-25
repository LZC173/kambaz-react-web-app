import  { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentEditor from "./AssignmentEditor";

export type AssignmentControlProps = {
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

export default function AssignmentControl({
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
}: AssignmentControlProps) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50 mt-5 ms-1">
          <InputGroup.Text><FaSearch/></InputGroup.Text>
          <Form.Control placeholder="Search..." />
        </InputGroup>
        <div className="mt-5 me-1 d-flex gap-2">
          <Button variant="light" className="border"><FaPlus className="me-1"/>Group</Button>
          <Button variant="danger" onClick={()=>setShow(true)}>
            <FaPlus className="me-1"/>Assignment
          </Button>
        </div>
      </div>

      <AssignmentEditor
        show={show}
        handleClose={() => setShow(false)}
        dialogTitle="Add Assignment"
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
        saveAssignment={() => { saveAssignment(); setShow(false); }}
      />
    </>
  );
}