import { useEffect, useState } from "react";

export default function SchoolCatalog() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetch("/api/courses.json")
      .then((response) => response.json())
      .then((data) => {
        setCourseData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courseData.map((course, index) => (
          <tr key={index}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
