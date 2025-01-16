import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const EnrollProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => [...prev, course]);
  };

  const dropCourse = (courseId) => {
    setEnrolledCourses((prev) => prev.filter(course => course.courseNumber !== courseId));
  };
  return (
    <AppContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
      {children}
    </AppContext.Provider>
  );
};

export const useEnroll = () => useContext(AppContext);
