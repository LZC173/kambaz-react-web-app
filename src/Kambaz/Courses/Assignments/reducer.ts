
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  modulesText: string;
  availableText: string;
  availableFrom: string;
  availableUntil: string;
  dueDateText: string;
  dueDate: string;
  points: number;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: dbAssignments,
};

/// make iso to text !!!!!!!!!!!!!!!!!!!!!! important !!!!!!!!!!!!!!
// without this ,format would be extremely ugly!!!!!!!!!!!!!!!!!!!

function formatText(iso: string, prefix: string) {
  const d = new Date(iso);
  const datePart = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  let h = d.getHours();
  const ampm = h < 12 ? "am" : "pm";
  h = h % 12 || 12;
  const m = String(d.getMinutes()).padStart(2, "0");
  return `${prefix} ${datePart} at ${h}:${m}${ampm}`;
}

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    
    // add new 
    addAssignment: (
      state,
      action: PayloadAction<{
        _id?: string;
        title: string;
        course: string;
        modulesText: string;
        availableFrom: string;
        availableUntil: string;
        dueDate: string;
        points: number;
      }>
    ) => {
      const p = action.payload;
      const id = p._id ?? uuidv4();
      state.assignments.push({
        _id: id,
        title: p.title,
        course: p.course,
        modulesText: p.modulesText,
        availableFrom: p.availableFrom,
        availableUntil: p.availableUntil,
        availableText: formatText(p.availableFrom, "Not available until"),
        dueDate: p.dueDate,
        dueDateText: formatText(p.dueDate, "Due"),
        points: p.points,
      });
    },

    // delete!!!!!!!!!
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },

    // update!!!!!!!!
    updateAssignment: (
      state,
      action: PayloadAction<{
        originalId: string;
        _id: string;
        title: string;
        course: string;
        modulesText: string;
        availableFrom: string;
        availableUntil: string;
        dueDate: string;
        points: number;
      }>
    ) => {
      const p = action.payload;
      state.assignments = state.assignments.map((a) =>
        a._id === p.originalId
          ? {
              _id: p._id,
              title: p.title,
              course: p.course,
              modulesText: p.modulesText,
              availableFrom: p.availableFrom,
              availableUntil: p.availableUntil,
              availableText: formatText(p.availableFrom, "Not available until"),
              dueDate: p.dueDate,
              dueDateText: formatText(p.dueDate, "Due"),
              points: p.points,
            }
          : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
