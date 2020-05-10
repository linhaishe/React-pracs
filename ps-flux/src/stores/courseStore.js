//this is built in Node,no need to install additional
import { EventEmitter } from "events";
//our store needs to emit an event each time a change occurs

import Dispatcher from "../appDispatcher";
//Dispatcher registration is typically defined below the store,since it's not part of the store's public api

import actionTypes from "../actions/actionTypes";

//declare a const for aviod typo
const CHANGE_EVENT = "change";
//强制private,it's means that no one can mess with th edata in the store unless they interact via the public api
let _courses = [];
//用const _courses = []会出错
class CourseStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
    //this will allow react components to subscriibe to our store so they're notified when changes occur
  }

  removeChangeListener(callback) {
    //react components to unsubscribe form the store
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  //获得课程，为了不污染原数组作为store的用途，专门写一个函数返回此数组，获得课程内容
  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    //predicate: a function that returns a boolean
    return _courses.find((course) => course.slug === slug);
  }

  //getCourses(),getCourseBySlug(slug),like a database table,they hold data,these funtions are a bit like a view
}

//create an instance of the store class
const store = new CourseStore();
//this code will store a new course within our store's private courses variable
Dispatcher.register((action) => {
  //this will be called anytime an action is dispatched
  //every store is notified of every action
  switch (action.actionType) {
    case actionTypes.DELETE_COURSE:
      _courses = _courses.filter(
        (course) => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    //当action creater 发生后，将课程添加到_course数组中
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      //anytime the store canges,we need to call emitchange
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map((course) =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    default:
    //nothing to do here
  }
});

export default store;
//functions in every Flux store
//1. addChangeListener(wraps on)
//2. removeChangeListener(wraps removeListener)
//3. emitChange(wraps emit)
