import logo from "./assets/logo.png";
import { useEnroll } from "./enrollContext";

export default function Header() {

  const { enrolledCourses } = useEnroll();

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
