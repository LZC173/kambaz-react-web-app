// src/Kambaz/Dashboard.tsx
import { Link } from "react-router-dom";
import { Card, Button, Col, Row, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  setCurrentCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,     
  unenrollCourse,    
  toggleShowAll,    
} from "./Courses/reducer";
import type { Course, Enrollment } from "./Courses/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const courses     = useSelector((state: any) => state.coursesReducer.courses)        as Course[];
  const course      = useSelector((state: any) => state.coursesReducer.currentCourse)  as Course;
  const enrollments = useSelector((state: any) => state.coursesReducer.enrollments)    as Enrollment[];
  const showAll     = useSelector((s:any) => s.coursesReducer.showAllEnrollments) as boolean;


  const addNewCourse = () =>
    dispatch(
      addCourse({
        name:        course.name,
        number:      course.number,
        startDate:   course.startDate,
        endDate:     course.endDate,
        description: course.description,
      })
    );

  const handleUpdate = () => dispatch(updateCourse(course));
  const handleDelete = (id: string) => dispatch(deleteCourse(id));
  const handleSelect = (c: Course) => dispatch(setCurrentCourse(c));
    const handleToggle   = () => dispatch(toggleShowAll());
  const handleEnroll   = (c: Course) =>
    dispatch(enrollCourse({ user: currentUser._id, course: c._id }));
  const handleUnenroll = (e: Enrollment) =>
    dispatch(unenrollCourse(e._id));
    const visible = showAll
    ? courses
    : courses.filter(c =>
        enrollments.some(en => en.user === currentUser._id && en.course === c._id)
      );

  return (
     <div id="wd-dashboard">
      <div className="d-flex align-items-center mb-3">
        <h1 className="flex-grow-1">Dashboard</h1>
        <Button variant="info" onClick={handleToggle}>
          {showAll ? "Show My Enrollments" : "Show All Courses"}
        </Button>
      </div>
      <hr />


           {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
          </h5>
          <hr />
          <button
            className="btn btn-warning float-end me-2"
            id="wd-update-course-click"
            onClick={handleUpdate}
          >
            Update
          </button>
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={e => handleSelect({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            rows={3}
            className="mb-4"
            value={course.description}
            onChange={e => handleSelect({ ...course, description: e.target.value })}
          />
        </>
      )}


      <h2 id="wd-dashboard-published">
        Published Courses({visible.length})
      </h2>
      <hr />


        <div id="wd-dashboard-courses">
          <Row xs={1} md={5} className="g-4">
            {visible.map((c: Course) => {
              const enrollment = enrollments.find(
                (en) => en.user === currentUser._id && en.course === c._id
              );
              const isEnrolled = Boolean(enrollment);

              return (
                <Col
                  key={c._id}
                  className="wd-dashboard-course"
                  style={{ width: "300px" }}
                >
                  <Card>
                    <Link
                      to={`/Kambaz/Courses/${c._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <Card.Img
                        src="/images/reactjs.jpg"
                        variant="top"
                        width="100%"
                        height={160}
                      />
                      <Card.Body className="card-body">
                        <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {c.name}
                        </Card.Title>
                        <Card.Text
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {c.description}
                        </Card.Text>
                        <Button variant="primary">Go</Button>
                      </Card.Body>
                    </Link>

                    <Card.Footer className="p-3">
                      {isEnrolled ? (
                        <Button
                          variant="danger"
                          onClick={() => handleUnenroll(enrollment!)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleEnroll(c)}
                        >
                          Enroll
                        </Button>
                      )}
                    </Card.Footer>
                    {currentUser.role === "FACULTY" && (
                      <Card.Footer className="text-end">
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleSelect(c)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </Button>
                      </Card.Footer>
                    )}
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
    </div>
  );
}