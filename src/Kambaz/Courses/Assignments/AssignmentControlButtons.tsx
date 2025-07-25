import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

export default function AssignmentControlButtons() {
 return (
   <div className="d-flex align-items-center gap-2">
     <FaCheckCircle className="text-success fs-5 me-2" />      <IoEllipsisVertical className="fs-4" />
    </div> 
    );
    }