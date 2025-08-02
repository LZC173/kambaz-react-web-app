// src/Kambaz/Courses/Assignments/client.ts
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
const axiosWithCredentials = axios.create({
  baseURL: REMOTE_SERVER,
  withCredentials: true,
});

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  modulesText: string;
  availableFrom: string;  
  availableUntil: string;  
  dueDate: string;      
  points: number;
  editing?: boolean;
}

export type CreateAssignmentForCoursePayload = Partial<{
  _id: string;
  title: string;
  modulesText: string;
  availableFrom: string;
  availableUntil: string;
  dueDate: string;
  points: number;
  course: string;
}>;

const logError = (tag: string, err: any) => {
  console.error(`[${tag}]`, err?.response?.status, err?.response?.data || err.message);
};

export const findAssignmentsForCourse = async (courseId: string): Promise<Assignment[]> => {
  try {
    const { data } = await axiosWithCredentials.get<Assignment[]>(
      `/api/courses/${encodeURIComponent(courseId)}/assignments`
    );
    return data;
  } catch (err: any) {
    logError("findAssignmentsForCourse", err);
    throw err;
  }
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: CreateAssignmentForCoursePayload
): Promise<Assignment> => {
  try {
    const body = { ...assignment, course: assignment.course ?? courseId };
    const { data } = await axiosWithCredentials.post<Assignment>(
      `/api/courses/${encodeURIComponent(courseId)}/assignments`,
      body
    );
    return data;
  } catch (err: any) {
    logError("createAssignmentForCourse", err);
    throw err;
  }
};

export const getAssignment = async (assignmentId: string): Promise<Assignment> => {
  try {
    const { data } = await axiosWithCredentials.get<Assignment>(
      `/api/assignments/${encodeURIComponent(assignmentId)}`
    );
    return data;
  } catch (err: any) {
    logError("getAssignment", err);
    throw err;
  }
};

export const updateAssignment = async (
  assignment: { _id: string } & Partial<Assignment>
): Promise<Assignment> => {
  try {
    const { data } = await axiosWithCredentials.put<Assignment>(
      `/api/assignments/${encodeURIComponent(assignment._id)}`,
      assignment
    );
    return data;
  } catch (err: any) {
    logError("updateAssignment", err);
    throw err;
  }
};

export const deleteAssignment = async (assignmentId: string): Promise<void> => {
  try {
    await axiosWithCredentials.delete(
      `/api/assignments/${encodeURIComponent(assignmentId)}`
    );
  } catch (err: any) {
    logError("deleteAssignment", err);
    throw err;
  }
};
