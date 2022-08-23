import { createStore, applyMiddleware } from "redux";
import rootReduce from "./reducer/index";
import thunk from "redux-thunk";

const store = createStore(rootReduce, applyMiddleware(thunk));

export default store;