//this is built in Node,no need to install additional
import { EventEmitter } from "events";
//our store needs to emit an event each time a change occurs

import Dispatcher from "../appDispatcher";
//Dispatcher registration is typically defined below the store,since it's not part of the store's public api

import actionType from "../actions/actionTypes";

//declare a const for aviod typo
const CHANGE_EVENT = "change";
//强制private,it's means that no one can mess with th edata in the store unless they interact via the public api
const _courses = [];
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

  getCoursesBySlug(slug) {
    //predicate: a function that returns a boolean
    return _courses.find((course) => course.slug === slug);
  }

  //getCourses(),getCoursesBySlug(slug),like a database table,they hold data,these funtions are a bit like a view
}

//create an instance of the store class
const store = new CourseStore();

Dispatcher.register((action) => {
  //this will be called anytime an action is dispatched
  //every store is notified of every action
  switch (action.actionType) {
    //当action creater 发生后，将课程添加到_course数组中
    case actionType.CREATE_COURSE:
      _courses.push(action.course);
      //anytime the store canges,we need to call emitchange
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
