import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>

      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        id="wd-query-parameter-add"
        className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>

      <a
        id="wd-query-parameter-subtract"
        className="btn btn-danger me-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Subtract {a} - {b}
      </a>

      <a
        id="wd-query-parameter-multiply"
        className="btn btn-warning me-2"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} × {b}
      </a>

      <a
        id="wd-query-parameter-divide"
        className="btn btn-success"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} ÷ {b}
      </a>

      <hr />
    </div>
  );
}
