import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import { PropTypes } from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     course: {
  //       title: "",
  //     },
  //   };
  // }

  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.dispatch(courseActions.createCourse(this.state.course));
    // this.props.createCourse(this.state.course);

    this.props.actions.createCourse(this.state.course);

    //we dont need to call dispatch since thats being handled in mapDispatchToProps

    //alert(this.state.course.title);
  };

  //匿名函数的this指向，和plain function 指向会导致功能性失败

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="Save" />
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};

//we've clarified that we expect dispatch to be passed into the CoursesPage component, and it will be passed in because connect automatically passes dispatch in if we omit that second argument, which was mapDispatchToProps.

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),

    // createCourse: bindActionCreators(courseActions, dispatch),

    actions: bindActionCreators(courseActions, dispatch),
  };
}

// const connectStateAndProps = connect(mapStateToProps, mapDispatchToProps);

// connectStateAndProps(CoursesPage);

//connect returns a function that function then calls our components

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
