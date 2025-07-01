import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        {/* course1：React */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack Software Developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* course2：Node.js */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
            <img src="/images/nodejs.jpg" width={200} />
            <div>
              <h5>CS2345 Node JS</h5>
              <p className="wd-dashboard-course-title">Backend with Express & MongoDB</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* course3：MongoDB */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
            <img src="/images/mongodb.jpg" width={200} />
            <div>
              <h5>CS3456 MongoDB</h5>
              <p className="wd-dashboard-course-title">NoSQL Database Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* course4：Java */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
            <img src="/images/java.jpg" width={200} />
            <div>
              <h5>CS4567 Java</h5>
              <p className="wd-dashboard-course-title">Object-Oriented Programming</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* course5：Python */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
            <img src="/images/python.jpg" width={200} />
            <div>
              <h5>CS5678 Python</h5>
              <p className="wd-dashboard-course-title">Data Science with Python</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* course6：C++ */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
            <img src="/images/cpp.jpg" width={200} />
            <div>
              <h5>CS6789 C++</h5>
              <p className="wd-dashboard-course-title">Low-Level Programming</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        {/* course 7：HTML/CSS */}
        <div className="wd-dashboard-course">
          <Link to="/Kambaz/Courses/7890/Home" className="wd-dashboard-course-link">
            <img src="/images/htmlcss.jpg" width={200} />
            <div>
              <h5>CS7890 HTML/CSS</h5>
              <p className="wd-dashboard-course-title">Frontend Web Design Basics</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
