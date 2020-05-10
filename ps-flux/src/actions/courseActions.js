//注意到文件名开头小写，因为这不是组件，里面不会包含对象

import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

//plain function
//this function create an action = action creator

// export function saveCourse(course) {
//   return courseApi.saveCourse(course).then((saveCourse) => {
//     //hey dispatcher,go tell all the stores that a course was just created
//     dispatcher.dispatch({
//       actionType: actionTypes.CREATE_COURSE,
//       course: saveCourse,
//     });
//   });
// }

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((saveCourse) => {
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: saveCourse,
    });
  });
}

//the action type best to use a constant instead
//10 line: when we use return in the function,now the caller will be notified when the promise resolves

export function loadCourses(course) {
  return courseApi.getCourses().then((courses) => {
    //hey dispatcher,go tell all the stores that a course was just created
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses,
    });
  });
}

export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    //hey dispatcher,go tell all the stores that a course was just created
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id,
    });
  });
}
