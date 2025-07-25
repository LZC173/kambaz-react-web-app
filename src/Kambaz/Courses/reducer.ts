// src/Kambaz/Courses/reducer.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { courses as dbCourses, enrollments as dbEnrollments } from "../Database";

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
}
export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}
const emptyCourse: Course = {
  _id: "",
  name: "",
  number: "",
  startDate: "",
  endDate: "",
  description: "",
};

interface CoursesState {
  courses: Course[];
  currentCourse: Course;
  enrollments: Enrollment[];
  showAllEnrollments: boolean;  
}

const initialState: CoursesState = {
  courses: dbCourses,
  currentCourse: emptyCourse,
  // db course, enrollmenst 
  enrollments: dbEnrollments,
  showAllEnrollments: false,   
};


const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCurrentCourse(state, action: PayloadAction<Course>) {
      state.currentCourse = action.payload;
    },
    clearCurrentCourse(state) {
      state.currentCourse = emptyCourse;
    },
    addCourse(state, action: PayloadAction<Omit<Course, "_id">>) {
      state.courses.push({ _id: uuidv4(), ...action.payload });
      state.currentCourse = emptyCourse;
    },
    updateCourse(state, action: PayloadAction<Course>) {
      state.courses = state.courses.map((c) =>
        c._id === action.payload._id ? action.payload : c
      );
      if (state.currentCourse._id === action.payload._id) {
        state.currentCourse = action.payload;
      }
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
      if (state.currentCourse._id === action.payload) {
        state.currentCourse = emptyCourse;
      }
    },

        //enroll course 
      enrollCourse(state, action: PayloadAction<{ user: string; course: string }>) {
        const exists = state.enrollments
          .some(e => e.user === action.payload.user && e.course === action.payload.course);
        if (!exists) {
          state.enrollments.push({
            _id: uuidv4(),              // new id use uuidv4
            user: action.payload.user,
            course: action.payload.course,
          });
        }
      },
    // unenroll here 
      unenrollCourse(state, action: PayloadAction<string>) {
        state.enrollments = state.enrollments.filter(
          e => e._id !== action.payload
        );
      },
    toggleShowAll(state) {            //  a button that define whether or not show all enrollment
      state.showAllEnrollments = !state.showAllEnrollments;
    },
  },
});



export const {
  setCurrentCourse,
  clearCurrentCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,  
  unenrollCourse,   
  toggleShowAll
} = coursesSlice.actions;
export default coursesSlice.reducer;