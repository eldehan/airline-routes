import { createSlice } from "@reduxjs/toolkit";
import DATA from '../data'

const routeSlice = createSlice({
  name: 'routes',
  initialState: DATA.routes,
  reducers: {
  }
})

export default routeSlice.reducer