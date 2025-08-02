
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
import FormControl from "react-bootstrap/FormControl";
import { useState } from "react";
import FormCheck from "react-bootstrap/FormCheck"; 
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  const [module, setModule] = useState({
  id: "123",
  name: "Web Dev Module",
  description: "Learn full-stack web development",
  course: "CS5610"
});

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>
            <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>

        <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Module Object</h4>
<a className="btn btn-primary me-2" href={`${REMOTE_SERVER}/lab5/module`}>
  Get Module
</a>
<a className="btn btn-primary me-2" href={`${REMOTE_SERVER}/lab5/module/name`}>
  Get Module Name
</a>

<FormControl
  className="w-75 mb-2"
  value={module.name}
  onChange={(e) => setModule({ ...module, name: e.target.value })}
/>
<a className="btn btn-warning me-2" href={`${REMOTE_SERVER}/lab5/module/name/${module.name}`}>
  Update Module Name
</a>

<FormControl
  className="w-75 mb-2"
  value={module.description}
  onChange={(e) => setModule({ ...module, description: e.target.value })}
/>
<a className="btn btn-warning me-2" href={`${REMOTE_SERVER}/lab5/module/description/${module.description}`}>
  Update Module Description
</a>

  <h4>Edit Assignment Score and Completion</h4>
      <FormControl
        type="number"
        className="w-75 mb-2"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })}
      />
      <a className="btn btn-info me-2"
        href={`${REMOTE_SERVER}/lab5/assignment/score/${assignment.score}`}>
        Update Score
      </a>

      <FormCheck
        type="checkbox"
        label="Completed"
        className="mb-2"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })}
      />
      <a className="btn btn-info me-2"
        href={`${REMOTE_SERVER}/lab5/assignment/completed/${assignment.completed}`}>
        Update Completed
      </a>


    </div>
    
);}
