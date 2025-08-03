import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

export interface CoursesState {
  myCourses: Course[];
  courses: Course[]; // 给你现有组件用的 alias
  enrollments: Enrollment[];
}

const initialState: CoursesState = {
  myCourses: [],
  courses: [],
  enrollments: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setMyCourses: (state, action: PayloadAction<Course[]>) => {
      state.myCourses = action.payload;
      state.courses = action.payload;
    },
    addMyCourse: (state, action: PayloadAction<Course>) => {
      if (!state.myCourses.some((c) => c._id === action.payload._id)) {
        state.myCourses.push(action.payload);
      }
      if (!state.courses.some((c) => c._id === action.payload._id)) {
        state.courses.push(action.payload);
      }
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const updated = action.payload;
      state.myCourses = state.myCourses.map((c) =>
        c._id === updated._id ? updated : c
      );
      state.courses = state.courses.map((c) =>
        c._id === updated._id ? updated : c
      );
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.myCourses = state.myCourses.filter((c) => c._id !== action.payload);
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    removeMyCourse: (state, action: PayloadAction<string>) => {
      state.myCourses = state.myCourses.filter((c) => c._id !== action.payload);
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
  },
});

export const {
  setMyCourses,
  addMyCourse,
  updateCourse,
  deleteCourse,
  removeMyCourse,
  setEnrollments,
} = coursesSlice.actions;

export default coursesSlice.reducer;
