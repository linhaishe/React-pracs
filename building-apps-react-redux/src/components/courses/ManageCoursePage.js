import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { PropTypes } from "prop-types";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";

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

function ManageCoursePage({courses,authors,loadCourses,loadAuthors,...props}) {
const [course,setCourse]=useState({...props.course});
//initialize errors to an empty object
const [errors,setErrors]=useState({});


  useEffect(()=>{
  
      if (courses.length === 0) {
          loadCourses().catch((error) => {
          alert("loading courses failed" + error);
        });
      }
  
      if (authors.length === 0) {
          loadAuthors().catch((error) => {
          alert("loading authors failed" + error);
        });
      }
    },[])
    //the empty array as a second argument to effect means the effect will run once when the component mounts
  
      return (
        <div>
          <CourseForm course={course} errors={errors} authors={authors}/>
          
        </div>
      );

  }
  

ManageCoursePage.propTypes = {
  course:PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
  };

//we've clarified that we expect dispatch to be passed into the ManageCoursePage component, and it will be passed in because connect automatically passes dispatch in if we omit that second argument, which was mapDispatchToProps.

function mapStateToProps(state) {
  return {
    course:newCourse,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
    loadCourses: courseActions.loadCourses,
    loadAuthors: authorActions.loadAuthors,
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
