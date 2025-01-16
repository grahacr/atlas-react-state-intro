import { useEffect, useState } from "react";
import { useEnroll } from "./enrollContext";

const PAGE_SIZE = 5;

export default function SchoolCatalog() {
  const [courseData, setCourseData] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const { enrollCourse } = useEnroll();

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

  const filteredCourses = courseData.filter((course) =>
    course.courseNumber.toLowerCase().includes(search.toLowerCase()) ||
  course.courseName.toLowerCase().includes(search.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sort) {
      const aValue = a[sort];
      const bValue = b[sort];
      if (direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }
    return 0;
  });

  const currentPageCourses = sortedCourses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = sortedCourses.length > page * PAGE_SIZE;
  const hasLess = page > 1;

  const sortDataHandler = (field) => {
    const sortOrder = sort === field && direction === 'asc' ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  };


  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={search}
      onChange={(e) => setSearch(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th onClick={() => sortDataHandler('trimester')}>Trimester</th>
            <th onClick={() => sortDataHandler('courseNumber')}>Course Number</th>
            <th onClick={() => sortDataHandler('courseName')}>Courses Name</th>
            <th onClick={() => sortDataHandler('semesterCredits')}>Semester Credits</th>
            <th onClick={() => sortDataHandler('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPageCourses.map((course, index) => (
          <tr key={index}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button onClick={() => enrollCourse(course)}>Enroll</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
