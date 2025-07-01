import { Link } from "react-router-dom";
//import { Route, Routes, Navigate } from "react-router-dom";
//import Lab1 from "./Lab1";
//import Lab2 from "./Lab2";
//import Lab3 from "./Lab3";

export default function TOC() {
  return (
    <ul>
      <li><Link to="/Labs">Labs</Link></li>
      <li><Link to="/Labs/Lab1">Lab 1</Link></li>
      <li><Link to="/Labs/Lab2">Lab 2</Link></li>
      <li><Link to="/Labs/Lab3">Lab 3</Link></li>
       <li><Link to="/Kambaz">Kambaz</Link></li>
    </ul>
  );
}
