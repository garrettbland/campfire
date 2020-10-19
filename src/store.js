import { createStore } from "redux";
import rootReducer from "./reducer";

/**
 * Create redux store and export to use
 */
const store = createStore(rootReducer);
export default store;
