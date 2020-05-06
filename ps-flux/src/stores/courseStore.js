//this is built in Node,no need to install additional
import { EventEmitter } from "events";
//our store needs to emit an event each time a change occurs

//declare a const for aviod typo
const CHANGE_EVENT = "change";
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
}

//create an instance of the store class
const store = new CourseStore();
export default store;
//functions in every Flux store
//1. addChangeListener(wraps on)
//2. removeChangeListener(wraps removeListener)
//3. emitChange(wraps emit)
