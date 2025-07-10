import { FaCheckCircle } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentLessonControlButtons() {
  return (
    <div className="float-end">
      <FaCheckCircle className="text-success fs-5 me-2" />
      <IoEllipsisVertical className="fs-5" />
    </div>
  );
}
