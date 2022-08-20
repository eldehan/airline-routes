import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: 'pages',
  initialState: {
    page: 0,
    resultsPerPage: 25,
    pageStart: 0
  },
  reducers: {
    nextPage(state, action) {
      state.page = state.page + 1
      state.pageStart = state.pageStart + state.resultsPerPage
    },
    previousPage(state, action) {
      state.page = state.page - 1
      state.pageStart = state.pageStart - state.resultsPerPage
    },
    setResultsPerPage(state, action) {
      state.resultsPerPage = action.payload
    },
    resetPageStart(state, action) {
      state.pageStart = action.payload
    }
  }
})

export const { nextPage, previousPage, setResultsPerPage, resetPageStart } = paginationSlice.actions
export default paginationSlice.reducer