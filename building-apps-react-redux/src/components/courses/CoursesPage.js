import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends Component {
  //const {courses,authors,actions} = this.props
  //可以用解构自己替代换一下哈

  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    //we only request authors and courses once,so use if statement
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    }

    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     course: {
  //       title: "",
  //     },
  //   };
  // }

  //we will use mangagepage to manage our courses,so we will deleted below code
  // state = {
  //   course: {
  //     title: "",
  //   },
  // };

  // handleChange = (event) => {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course });
  // };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   // this.props.dispatch(courseActions.createCourse(this.state.course));
  //   // this.props.createCourse(this.state.course);

  //   this.props.actions.createCourse(this.state.course);

  //   //we dont need to call dispatch since thats being handled in mapDispatchToProps

  //   //alert(this.state.course.title);
  // };

  //匿名函数的this指向，和plain function 指向会导致功能性失败
  handleDeleteCourse = (course) => {
    toast.success("Course deleted");
    this.props.actions.deleteCourse(course);
  };

  render() {
    return (
      // <form onSubmit={this.handleSubmit}>
      //   <h2>Courses</h2>
      //   <h3>Add Course</h3>
      //   <input
      //     type="text"
      //     onChange={this.handleChange}
      //     value={this.state.course.title}
      //   />

      //   <input type="submit" value="Save" />
      //   {this.props.courses.map((course) => (
      //     <div key={course.title}>{course.title}</div>
      //   ))}
      // </form>
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {/* {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))} */}
        {/* <Spinner /> 组件实现失败 */}

        {this.props.loading ? (
          <Spinner />
        ) : (
          <div>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </div>
        )}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

//we've clarified that we expect dispatch to be passed into the CoursesPage component, and it will be passed in because connect automatically passes dispatch in if we omit that second argument, which was mapDispatchToProps.

function mapStateToProps(state) {
  return {
    // courses: state.courses,
    //add author's name to each course
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),

    // createCourse: bindActionCreators(courseActions, dispatch),
    // actions: bindActionCreators(courseActions, dispatch)

    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
      actions: bindActionCreators(courseActions, dispatch),
    },
  };
}

// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);

// connectStateAndProps(CoursesPage);

//connect returns a function that function then calls our components

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
