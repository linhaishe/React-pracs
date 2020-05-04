//create a new component called managecoursepage that display url parameters from react router

//use react router to display a value from the url
import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
//import { toast } from "react-toastify";
//从route中取值的话需要传props参数
const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  function handleChange(event) {
    //由于要处理多个input属性值，可以简化写法
    //复制课程对象并将副本上的title属性赋值为用户输入的数据

    const updatedCourse = {
      ...course,
      //这里不是解构，是computed property,允许根据变量设置属性
      [event.target.name]: event.target.value,
    };
    setCourse(updatedCourse);
  }
  //debugger;

  //save course
  function handleSubmit(event) {
    //prevent the page from posting back to the server
    event.preventDefault();
    //to save,we'll call the mock api,when we call savecourse function,it will call our local api that's hosted via json server,json server will write the data to the file system to mimic a data base,so even if we refresh,we are going to se the new data
    courseApi.saveCourse(course).then(() => {
      //写入数据之后将会运行then函数，返回course页面
      props.history.push("/courses");
      //toast.success("Course saved");
    });

    //the data will persist untill stop the app,remember,the db is reset on npm strat
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        onChange={handleChange}
        onsubmit={handleSubmit}
      />
      {/* <Prompt when={true} message="are you sure to leave?" /> */}
      {/* 此处slug好像是本身就带有或者是其他数据已经写好了，如果更改则搜不到课程数据了 */}
      {props.match.params.slug}
    </>
  );
};

export default ManageCoursePage;
