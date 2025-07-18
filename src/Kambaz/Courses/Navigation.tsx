// src/Kambaz/Courses/Navigation.tsx

import { Link, useLocation, useParams } from "react-router-dom";
import "../styles.css";

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const { pathname } = useLocation();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "People",
  ];

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((label) => {
        const to = `/Kambaz/Courses/${cid}/${label}`;
        const isActive = pathname.endsWith(`/${label}`);
        const baseClass = "list-group-item border border-0";
        const className = isActive
          ? `${baseClass} active`
          : `${baseClass} text-danger`;

        return (
          <Link
            key={label}
            to={to}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={className}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
