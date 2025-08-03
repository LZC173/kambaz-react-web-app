import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col, Row, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  setMyCourses as setMyCoursesAction,
  updateCourse as updateCourseAction,
  deleteCourse as deleteCourseAction,
  setEnrollments as setEnrollmentsAction,
} from "./Courses/reducer";

import {
  findMyCourses,
  createCourse as createCourseClient,
  enrollUserInCourse,
  unEnrollUserFromCourse,
  fetchMyEnrollments,
} from "./Account/client";
import * as courseClient from "./Courses/client";

const defaultCourse = {
  _id: "",
  name: "New Course",
  number: "NEW101",
  startDate: "2025-01-01",
  endDate: "2025-05-01",
  description: "Created by user",
};

export default function Dashboard() {
  const dispatch: any = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const myCourses = useSelector((state: any) => state.coursesReducer.myCourses) as any[];
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({ ...defaultCourse });
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);

  const fetchCourses = async () => {
    const my = await findMyCourses();
    dispatch(setMyCoursesAction(my));
  };

  const fetchEnrollments = async () => {
    const enrollments = await fetchMyEnrollments();
    dispatch(setEnrollmentsAction(enrollments));
  };

  const fetchAllCourses = async () => {
    const all = await courseClient.fetchAllCourses();
    setAllCourses(all);
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchCourses();
    fetchAllCourses();
    fetchEnrollments();
  }, [currentUser]);

  const addNewCourse = async () => {
    const newCourse = await createCourseClient({
      name: course.name || "New Course",
      number: course.number || "NEW101",
      startDate: course.startDate || "2025-01-01",
      endDate: course.endDate || "2025-05-01",
      description: course.description || "Created by user",
    });
    dispatch(setMyCoursesAction([...myCourses, newCourse]));
    setAllCourses([...allCourses, newCourse]);
    setCourse({ ...defaultCourse });
    await fetchEnrollments();
  };

  const updateCourseLocal = async () => {
    if (!course._id) return;
    await courseClient.updateCourse(course);
    dispatch(updateCourseAction(course));
    setAllCourses(allCourses.map((c) => (c._id === course._id ? course : c)));
  };

  const deleteCourseLocal = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(deleteCourseAction(courseId));
    setAllCourses(allCourses.filter((c) => c._id !== courseId));
  };

  const enroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    await enrollUserInCourse(currentUser._id, courseId);
    const my = await findMyCourses();
    dispatch(setMyCoursesAction(my));
    await fetchEnrollments();
  };

  const unEnroll = async (courseId: string) => {
    if (!currentUser?._id) return;
    await unEnrollUserFromCourse(currentUser._id, courseId);
    const my = await findMyCourses();
    dispatch(setMyCoursesAction(my));
    await fetchEnrollments();
  };

  const isUserEnrolled = (courseId: string) => {
    return myCourses.some((c) => c._id === courseId);
  };

  const displayedCourses = showAllCourses ? allCourses : myCourses;
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "All Courses"}
        </button>
      </div>
      <hr />
      {isFaculty && (
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

            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourseLocal}
              id="wd-update-course-click"
            >
              Update
            </button>
            <br />
            <br />
            <FormControl
              value={course.name}
              className="mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
              placeholder="Course Name"
            />
            <FormControl
              as="textarea"
              value={course.description}
              rows={3}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
              placeholder="Course Description"
            />
          </h5>
          <hr />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        {showAllCourses
          ? `All Courses (${allCourses.length})`
          : `My Courses (${myCourses.length})`}
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((courseItem: any) => (
            <Col
              key={courseItem._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={`/Kambaz/Courses/${courseItem._id}/Home`}
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
                      {courseItem.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {courseItem.description}
                    </Card.Text>

                    <div className="d-flex flex-wrap gap-2 mb-2">
                      {!showAllCourses && (
                        <>
                          <Button variant="primary">Go</Button>
                          {isFaculty && (
                            <>
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  deleteCourseLocal(courseItem._id);
                                }}
                                className="btn btn-danger float-end"
                                id="wd-delete-course-click"
                              >
                                Delete
                              </button>
                              <button
                                id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  setCourse(courseItem);
                                }}
                                className="btn btn-warning me-2 float-end"
                              >
                                Edit
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      {isUserEnrolled(courseItem._id) ? (
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            unEnroll(courseItem._id);
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            enroll(courseItem._id);
                          }}
                        >
                          Enroll
                        </Button>
                      )}
                    </div>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
