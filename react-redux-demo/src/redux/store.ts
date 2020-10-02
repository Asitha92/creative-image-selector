import { createStore } from "redux";
import carReducer from "./vehicles/carReducer";

const store = createStore(carReducer);

export default store;
