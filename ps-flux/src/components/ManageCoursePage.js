//create a new component called managecoursepage that display url parameters from react router

//use react router to display a value from the url
import React from "react";
import { Prompt } from "react-router-dom";

//从route中取值的话需要传props参数
const ManageCoursePage = (props) => {
  //debugger;
  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt when={true} message="are you sure to leave?" /> */}
      {/* 此处slug好像是本身就带有或者是其他数据已经写好了，如果更改则搜不到课程数据了 */}
      {props.match.params.slug}
    </>
  );
};

export default ManageCoursePage;
