//this is built in Node,no need to install additional
import { EventEmitter } from "events";
//our store needs to emit an event each time a change occurs

import Dispatcher from "../appDispatcher";
//Dispatcher registration is typically defined below the store,since it's not part of the store's public api

import actionType from "../actions/actionTypes";

//declare a const for aviod typo
const CHANGE_EVENT = "change";
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

  getCourses() {
    return _courses;
  }

  getCoursesBySlug(slug) {
    //predicate: a function that returns a boolean
    return _courses.find((course) => course.slug === slug);
  }
}

//create an instance of the store class
const store = new CourseStore();

Dispatcher.register((action) => {
  //this will be called anytime an action is dispatched
  //every store is notified of every action
  switch (action.actionType) {
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
