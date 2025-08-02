import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client";

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
  courses: Course[]; // all courses
  myCourses: Course[]; // enrolled courses from backend
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


export const loadAllCourses = createAsyncThunk("courses/loadAll", async () => {
  const data = await courseClient.fetchAllCourses();
  return data as Course[];
});

export const loadMyCourses = createAsyncThunk("courses/loadMine", async () => {
  const data = await userClient.findMyCourses();
  return data as Course[];
});

export const loadEnrollments = createAsyncThunk(
  "courses/loadEnrollments",
  async () => {
    const data = await userClient.fetchMyEnrollments();
    return data as Enrollment[];
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (coursePayload: Omit<Course, "_id">) => {
    const newCourse = await userClient.createCourse(coursePayload);
    return newCourse as Course;
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async (course: Course) => {
    await courseClient.updateCourse(course);
    return course; // backend returns 204 so keep local version
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    return courseId;
  }
);

export const enrollInCourse = createAsyncThunk(
  "courses/enroll",
  async (courseId: string) => {
    await userClient.enrollInCourse(courseId);
    const updated = await userClient.findMyCourses();
    return updated as Course[];
  }
);

export const unenrollFromCourse = createAsyncThunk(
  "courses/unenroll",
  async (courseId: string) => {
    const enrollment = await userClient.getEnrollmentForCourse(courseId);
    if (!enrollment || !enrollment._id) {
      throw new Error("Enrollment not found");
    }
    await userClient.unenroll(enrollment._id);
    const updated = await userClient.findMyCourses();
    return updated as Course[];
  }
);

/** Slice **/
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
    toggleShowAll(state) {
      state.showAllEnrollments = !state.showAllEnrollments;
    },
  },
  extraReducers: (builder) => {
    builder
      // loadAllCourses
      .addCase(loadAllCourses.pending, (s) => {
        s.loadingAll = true;
        s.error = undefined;
      })
      .addCase(loadAllCourses.fulfilled, (s, a) => {
        s.loadingAll = false;
        s.courses = a.payload;
      })
      .addCase(loadAllCourses.rejected, (s, a) => {
        s.loadingAll = false;
        s.error = a.error.message;
      })
      // loadMyCourses
      .addCase(loadMyCourses.pending, (s) => {
        s.loadingMine = true;
        s.error = undefined;
      })
      .addCase(loadMyCourses.fulfilled, (s, a) => {
        s.loadingMine = false;
        s.myCourses = a.payload;
      })
      .addCase(loadMyCourses.rejected, (s, a) => {
        s.loadingMine = false;
        s.error = a.error.message;
      })
      // loadEnrollments
      .addCase(loadEnrollments.pending, (s) => {
        s.loadingEnrollments = true;
        s.error = undefined;
      })
      .addCase(loadEnrollments.fulfilled, (s, a) => {
        s.loadingEnrollments = false;
        s.enrollments = a.payload;
      })
      .addCase(loadEnrollments.rejected, (s, a) => {
        s.loadingEnrollments = false;
        s.error = a.error.message;
      })
      // createCourse
      .addCase(createCourse.pending, (s) => {
        s.creating = true;
        s.error = undefined;
      })
      .addCase(createCourse.fulfilled, (s, a) => {
        s.creating = false;
        s.courses.push(a.payload);
        s.myCourses.push(a.payload); // backend auto-enrolled creator
        s.currentCourse = emptyCourse;
      })
      .addCase(createCourse.rejected, (s, a) => {
        s.creating = false;
        s.error = a.error.message;
      })
      // updateCourse
      .addCase(updateCourse.pending, (s) => {
        s.updating = true;
        s.error = undefined;
      })
      .addCase(updateCourse.fulfilled, (s, a) => {
        s.updating = false;
        const updated = a.payload;
        s.courses = s.courses.map((c) => (c._id === updated._id ? updated : c));
        s.myCourses = s.myCourses.map((c) => (c._id === updated._id ? updated : c));
        if (s.currentCourse._id === updated._id) {
          s.currentCourse = updated;
        }
      })
      .addCase(updateCourse.rejected, (s, a) => {
        s.updating = false;
        s.error = a.error.message;
      })
      // deleteCourse
      .addCase(deleteCourse.pending, (s) => {
        s.deleting = true;
        s.error = undefined;
      })
      .addCase(deleteCourse.fulfilled, (s, a) => {
        s.deleting = false;
        const id = a.payload;
        s.courses = s.courses.filter((c) => c._id !== id);
        s.myCourses = s.myCourses.filter((c) => c._id !== id);
        if (s.currentCourse._id === id) {
          s.currentCourse = emptyCourse;
        }
      })
      .addCase(deleteCourse.rejected, (s, a) => {
        s.deleting = false;
        s.error = a.error.message;
      })

      .addCase(enrollInCourse.pending, (s) => {
        s.enrolling = true;
        s.error = undefined;
      })
      .addCase(enrollInCourse.fulfilled, (s, a) => {
        s.enrolling = false;
        s.myCourses = a.payload;
      })
      .addCase(enrollInCourse.rejected, (s, a) => {
        s.enrolling = false;
        s.error = a.error.message;
      })

      .addCase(unenrollFromCourse.pending, (s) => {
        s.unenrolling = true;
        s.error = undefined;
      })
      .addCase(unenrollFromCourse.fulfilled, (s, a) => {
        s.unenrolling = false;
        s.myCourses = a.payload;
      })
      .addCase(unenrollFromCourse.rejected, (s, a) => {
        s.unenrolling = false;
        s.error = a.error.message;
      });
  },
});

export const {
  setCurrentCourse,
  clearCurrentCourse,
  toggleShowAll,
} = coursesSlice.actions;
export default coursesSlice.reducer;
