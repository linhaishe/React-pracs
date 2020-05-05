import { Dispatcher } from "flux";
//create instant
const dispatcher = new Dispatcher();
export default dispatcher;

//it's a singleton ,there's only one dispatcher per app
//this dispatcher will hold a list of callbacks and all our app's actions will be dispatched via this dispatcher.
//the store will register with this  dispatcher to say  that they'd like to be informed when actions occur.