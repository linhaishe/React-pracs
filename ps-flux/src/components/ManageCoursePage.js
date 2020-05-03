//create a new component called managecoursepage that display url parameters from react router

//use react router to display a value from the url
import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import CourseForm from "./CourseForm";

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
  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm course={course} onChange={handleChange} />
      {/* <Prompt when={true} message="are you sure to leave?" /> */}
      {/* 此处slug好像是本身就带有或者是其他数据已经写好了，如果更改则搜不到课程数据了 */}
      {props.match.params.slug}
    </>
  );
};

export default ManageCoursePage;
