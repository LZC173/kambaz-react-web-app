import { configureStore } from "@reduxjs/toolkit";
import modulesReducer     from "./Courses/Modules/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import coursesReducer     from "./Courses/reducer";    
import accountReducer     from "./Account/reducer";

const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentsReducer,
    coursesReducer,     
    accountReducer,
  },
});

export default store;
