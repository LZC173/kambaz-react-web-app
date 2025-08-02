import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  const response = await  axiosWithCredentials.post( `${USERS_API}/signin`, credentials );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};
export const signout = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
  return response.data;
};




//for course!!!
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};


export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};




// enroll current course segement 
export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/enrollments`,
    { courseId }
  );
  return data; //
};

//
export const getEnrollmentForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments/${courseId}`
  );
  return data; // enrollment object
};

// unenroll
export const unenroll = async (enrollmentId: string) => {
  await axiosWithCredentials.delete(
    `${USERS_API}/current/enrollments/${enrollmentId}`
  );
};

export const fetchMyEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};