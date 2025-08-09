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
  courses: Course[];        //
  enrollments: Enrollment[]; 
  draft: Course;            // 
}

export const DEFAULT_COURSE: Course = {
  _id: "",
  name: "New Course",
  number: "NEW101",
  startDate: "2025-01-01",
  endDate: "2025-05-01",
  description: "Created by user",
};

const initialState: CoursesState = {
  myCourses: [],
  courses: [],
  enrollments: [],   // 
  draft: { ...DEFAULT_COURSE },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {

    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    setMyCourses: (state, action: PayloadAction<Course[]>) => {
      state.myCourses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      const c = action.payload;
      if (!state.courses.some((x) => x._id === c._id)) state.courses.push(c);
      if (!state.myCourses.some((x) => x._id === c._id)) state.myCourses.push(c);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      const u = action.payload;
      state.courses = state.courses.map((c) => (c._id === u._id ? u : c));
      state.myCourses = state.myCourses.map((c) => (c._id === u._id ? u : c));
      if (state.draft._id === u._id) state.draft = { ...u };
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.courses = state.courses.filter((c) => c._id !== id);
      state.myCourses = state.myCourses.filter((c) => c._id !== id);
      if (state.draft._id === id) state.draft = { ...DEFAULT_COURSE };
    },


    setDraft: (state, action: PayloadAction<Course>) => {
      state.draft = { ...action.payload };
    },
    updateDraft: (state, action: PayloadAction<Partial<Course>>) => {
      state.draft = { ...state.draft, ...action.payload };
    },
    resetDraft: (state) => {
      state.draft = { ...DEFAULT_COURSE };
    },

    //
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload ?? [];
    },
  },
});

export const {
  setCourses,
  setMyCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setDraft,
  updateDraft,
  resetDraft,
  setEnrollments,
} = coursesSlice.actions;

export default coursesSlice.reducer;
