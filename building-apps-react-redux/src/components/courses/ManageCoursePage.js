import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";

import { PropTypes } from "prop-types";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

//we are going to want to load our course and author data
// class ManageCoursePage extends Component {
//   componentDidMount() {
//     const {courses,authors,loadCourses,loadAuthors} = this.props
//     //可以用解构自己替代换一下哈

//     if (courses.length === 0) {
//         loadCourses().catch((error) => {
//         alert("loading courses failed" + error);
//       });
//     }

//     if (authors.length === 0) {
//         loadAuthors().catch((error) => {
//         alert("loading authors failed" + error);
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h2>Manage Course</h2>
//       </div>
//     );
//   }
// }

//aviod using redux for all state,use plain react state for data only one,few components use (such as form state)
//plain react state remains useful for local state,use redux for more global values
//to choose redux vs local state,ask"who cares about this data,if only a few closely related components use the data,prefer plain react state

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  //initialize errors to an empty object
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    //这里需要再多理解 implement centralized change handler 11 part
    const { name, value } = event.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
      //events retuns numbers as string so we need to convert authorId to an int here
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving(true);
    //we dont need to save false,cus going to redirect to another page
    saveCourse(course).then(() => {
      toast.success("course saved !");
      history.push("/courses");
    });
  }
  //this thunk returns a promise,so we can chain .then on this call
  //after save is done ,use react router's history to change the url to the course list page

  //the empty array as a second argument to effect means the effect will run once when the component mounts

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <div>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
//this is a selector,it selects data from the redux store
//can declare this in the course reducer for easy reuse
export function getCourseBySlug(course, slug) {
  return course.find((course) => course.slug === slug) || null;
}

//any component loaded via <route> get history passed in on props from react router

//we've clarified that we expect dispatch to be passed into the ManageCoursePage component, and it will be passed in because connect automatically passes dispatch in if we omit that second argument, which was mapDispatchToProps.

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    //goal:read th eurl to determine whether the user is trying to create a new course or edit an existing course
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

//ownProps let us access the component's props.we can use this to read the url data injected on props by react router

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
