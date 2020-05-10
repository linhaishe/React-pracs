import React, { Component, useState, useEffect } from "react";
//import { getCourses } from "../api/courseApi";
//取代api使用store
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

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
  // const [courses, setCourses] = useState([]);
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    //naming collision
    // getCourses().then((_courses) => setCourses(_courses));
    // setCourses(courseStore.getCourses());
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    //since our component is conneted the flus store shen courses are added to the store,onChange will be called
    return () => courseStore.removeChangeListener(onChange);
    //cleanup on unmount
    // with useEffect you declare the code to run on unmount by returning a function
    // when you add an event listner on mount,you should also clean it up when the component unmount
  }, []);

  function onChange() {
    //when the courseStore changes we want to get the list of courses and update state
    setCourses(courseStore.getCourses());
  }
  return (
    <div>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </div>
  );
}
