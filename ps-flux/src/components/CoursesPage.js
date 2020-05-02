import React, { Component, useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

//request a list of courses when this pages loads

// export default class CoursesPage extends Component {
//   state = {
//     courses: [],
//   };

//   //the component must be mounted before we setState
//   //this is the method for making api call

//   componentDidMount() {
//     //here using promises for async in this course.but you can use async/await if you prefer
//     //调用api，引用从api返回的一些列课程数据
//     getCourses().then((courses) => {
//       this.setState({ courses: courses });
//     });

//     //function i declare in.then will be called when the api call is completed

//     //setstate calls only update the properties you specify

//     //this(this.setstate 里的this) says: get courses from the api when the call completes,store the array of courses in state
//   }

//   render() {
//     return (
//       <div>
//         <h2>Courses</h2>
//         {/* display a table row for each course */}
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author ID</th>
//               <th>Category</th>
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.courses.map((course) => {
//               return (
//                 <tr key={course.id}>
//                   <td>{course.title}</td>
//                   <td>{course.authorId}</td>
//                   <td>{course.category}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

//calling setCourses causes the component to re-render,which caused useEffect ro re-run and useEffect ran in an inifinite loop.the dependency array is a list of vakues that useEffect should watch.it re-runs when values in this array change

//refactoring with hooks

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    //naming collision
    getCourses().then((_courses) => setCourses(_courses));
  }, []);
  return (
    <div>
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </div>
  );
}
