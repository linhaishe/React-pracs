import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//separate our logic for our markup,so create this components
export default function CourseList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author ID</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {/* 将每个课程赋予一个链接 添加link组件*/}
        {props.courses.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => props.deleteCourse(course.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorId}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//creating separate components for logic and markup can make your components easier to maintain and reuse

// CourseList.propTypes = {
//   courses: PropTypes.array.isRequired,
// };

//如果没有接收到正确形式的数据，则设置默认值，显示空数组
// CourseList.defaultProps = {
//   course: [],
// };

//每个数组里的对象的统一格式,each object in these array muasy have these properties
CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
