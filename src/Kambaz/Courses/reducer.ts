import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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

export interface CoursesState {
  courses: Course[];
  myCourses: Course[];
  currentCourse: Course;
  showAllEnrollments: boolean;
  enrollments: Enrollment[];

  loadingAll: boolean;
  loadingMine: boolean;
  loadingEnrollments: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  enrolling: boolean;
  unenrolling: boolean;
  error?: string;
}

const initialState: CoursesState = {
  courses: [],
  myCourses: [],
  currentCourse: emptyCourse,
  showAllEnrollments: false,
  enrollments: [],

  loadingAll: false,
  loadingMine: false,
  loadingEnrollments: false,
  creating: false,
  updating: false,
  deleting: false,
  enrolling: false,
  unenrolling: false,
  error: undefined,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Omit<Course, "_id">>) => {
      const payload = action.payload;
      const newCourse: Course = {
        _id: uuidv4(),
        name: payload.name,
        number: payload.number,
        startDate: payload.startDate,
        endDate: payload.endDate,
        description: payload.description,
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      state.courses = state.courses.map((c) => (c._id === course._id ? course : c));
    },
  },
});

export const { setCourses, addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
