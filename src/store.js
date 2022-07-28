import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from './reducers/paginationReducer'
import filterReducer from "./reducers/filterReducer";
import routeReducer from "./reducers/routeReducer";

const store = configureStore({
  reducer: {
    pages: paginationReducer,
    filter: filterReducer,
    routes: routeReducer
  }
})

export default store