import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  modulesText: string;
  availableText?: string;
  availableFrom: string;
  availableUntil: string;
  dueDateText?: string;
  dueDate: string;
  points: number;
  editing?: boolean;
}

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [],
};

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

const enrich = (a: Partial<Assignment>): Assignment => {
  const availableFrom = a.availableFrom || "";
  const dueDate = a.dueDate || "";
  return {
    _id: a._id ?? uuidv4(),
    title: a.title ?? "",
    course: a.course ?? "",
    modulesText: a.modulesText ?? "",
    availableFrom,
    availableUntil: a.availableUntil ?? "",
    availableText:
      a.availableText ??
      (availableFrom ? formatText(availableFrom, "Not available until") : ""),
    dueDate,
    dueDateText:
      a.dueDateText ?? (dueDate ? formatText(dueDate, "Due") : ""),
    points: a.points ?? 0,
    editing: a.editing ?? false,
  };
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }: PayloadAction<Partial<Assignment>[]>) => {
      state.assignments = payload.map((a) => enrich(a));
    },
    addAssignment: (state, { payload }: PayloadAction<Partial<Assignment>>) => {
      const newAssignment = enrich(payload);
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== payload);
    },
    updateAssignment: (
      state,
      { payload }: PayloadAction<Partial<Assignment> & { _id: string }>
    ) => {
      state.assignments = state.assignments.map((a) => {
        if (a._id !== payload._id) return a;
        const merged: any = { ...a, ...payload };

        if (payload.availableFrom) {
          delete merged.availableText;
        }
        if (payload.dueDate) {
          delete merged.dueDateText;
        }

        return enrich(merged);
      });
    },
    setAssignmentField: (
      state,
      {
        payload,
      }: PayloadAction<{
        _id: string;
        field: keyof Omit<Assignment, "_id">;
        value: any;
      }>
    ) => {
      state.assignments = state.assignments.map((a) => {
        if (a._id !== payload._id) return a;
        // @ts-ignore
        a[payload.field] = payload.value;
        if (payload.field === "availableFrom") {
          a.availableText = a.availableFrom
            ? formatText(a.availableFrom, "Not available until")
            : "";
        }
        if (payload.field === "dueDate") {
          a.dueDateText = a.dueDate ? formatText(a.dueDate, "Due") : "";
        }
        return a;
      });
    },
    renameAssignmentId: (
      state,
      { payload }: PayloadAction<{ oldId: string; newId: string }>
    ) => {
      const existing = state.assignments.find((a) => a._id === payload.oldId);
      if (!existing) return;
      const renamed: Assignment = { ...existing, _id: payload.newId };
      state.assignments = state.assignments
        .filter((a) => a._id !== payload.oldId)
        .concat(renamed);
    },
    editAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload ? { ...a, editing: true } : a
      );
    },
    finishEditingAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload ? { ...a, editing: false } : a
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignmentField,
  renameAssignmentId,
  editAssignment,
  finishEditingAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
