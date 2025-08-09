import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Col, Row, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import {
  setCourses,
  addCourse,
  updateCourse as updateCourseAction,
  deleteCourse as deleteCourseAction,
  setDraft,
  updateDraft,
  resetDraft,
  setEnrollments,
} from "./Courses/reducer";

import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client"; 
export default function Dashboard() {
  const dispatch: any = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses: allCourses, draft: course, enrollments } = useSelector(
    (state: any) => state.coursesReducer
  );


  //enrolling or not enrolling // local boolean 
      const [enrolling, setEnrolling] = useState<boolean>(false); 

  // 
const findCoursesForUser = async () => {
  try {
    const courses = await userClient.findCoursesForUser(currentUser._id);
    dispatch(setCourses(courses));
    dispatch(
      setEnrollments(
        (courses ?? []).map((c: any) => ({
          _id: `${currentUser._id}-${c._id}`,
          user: currentUser._id,
          course: c._id,
        }))
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  //fectch all course 
const fetchCourses = async () => {
  try {
    const allCourses = await courseClient.fetchAllCourses();
    const enrolledCourses = await userClient.findCoursesForUser(
      currentUser._id
    );
    const courses = allCourses.map((course: any) => {
      if (enrolledCourses.find((c: any) => c._id === course._id)) {
        return { ...course, enrolled: true };
      } else {
        return course;
      }
    });
    dispatch(setCourses(courses));

    
    dispatch(
      setEnrollments(
        (enrolledCourses ?? []).map((c: any) => ({
          _id: `${currentUser._id}-${c._id}`,
          user: currentUser._id,
          course: c._id,
        }))
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  // ..
 useEffect(() => {
   if (enrolling) {
     fetchCourses();
   } else {
     findCoursesForUser();
   }
 }, [currentUser, enrolling]);



const updateEnrollment = async (courseId: string, enrolled: boolean) => {
  if (!currentUser?._id) return;

  try {

    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }

    // 1) update redux couse
    const target = (allCourses ?? []).find((c: any) => c._id === courseId);
    if (target) {
      const updated = { ...target, enrolled } as any;
      dispatch(updateCourseAction(updated)); 
    }

    // 2) update enrollmentmenu
    const nextEnrollments = enrolled
      ? [
          ...enrollments.filter(
            (e: any) => !(e.user === currentUser._id && e.course === courseId)
          ),
          { _id: `${currentUser._id}-${courseId}`, user: currentUser._id, course: courseId },
        ]
      : enrollments.filter(
          (e: any) => !(e.user === currentUser._id && e.course === courseId)
        );

    dispatch(setEnrollments(nextEnrollments));
  } catch (err) {
    console.error("updateEnrollment failed:", err);
  }
};



  const addNewCourse = async () => {
    const payload = {
      name: course.name || "New Course",
      number: course.number || "NEW101",
      startDate: course.startDate || "2025-01-01",
      endDate: course.endDate || "2025-05-01",
      description: course.description || "Created by user",
    };
    const newCourse = await courseClient.createCourse(payload);
    dispatch(addCourse(newCourse));
    dispatch(resetDraft());
      if (enrolling) {
    await fetchCourses();
  } else {
    await findCoursesForUser();
  }
  };


  const updateCourseLocal = async () => {
    if (!course._id) return;
    await courseClient.updateCourse(course);
    dispatch(updateCourseAction(course));
  };


  const deleteCourseLocal = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(deleteCourseAction(courseId));
  //delete enrollments for redux 
  dispatch(setEnrollments(enrollments.filter((e: any) => e.course !== courseId)));
  };

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>

          <button
          className="btn btn-primary"
          onClick={() => setEnrolling(!enrolling)}
        >
          {enrolling ? "My Courses" : "All Courses"}
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
              onChange={(e) => dispatch(updateDraft({ name: e.target.value }))}
              placeholder="Course Name"
            />
            <FormControl
              as="textarea"
              value={course.description}
              rows={3}
              onChange={(e) =>
                dispatch(updateDraft({ description: e.target.value }))
              }
              placeholder="Course Description"
            />
          </h5>
          <hr />
        </>
      )}

      <hr />
      <h2 id="wd-dashboard-published">All Courses ({allCourses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        
        <Row xs={1} md={5} className="g-4">
          {allCourses.map((courseItem: any) => (
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
                      <Button variant="primary">Go</Button>
                        {enrolling && (
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            updateEnrollment(courseItem._id, !courseItem.enrolled);
                          }}
                          className={`btn ${courseItem.enrolled ? "btn-danger" : "btn-success"}`}
                        >
                          {courseItem.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}
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
                              dispatch(setDraft(courseItem));
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
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
