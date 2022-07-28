import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  airlineFilter: 'all',
  airportFilter: 'all',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAirlineFilter(state, action) {
      state.airlineFilter = action.payload
    },
    setAirportFilter(state, action) {
      state.airportFilter = action.payload
    },
    clearFilters(state, action) {
      return initialState
    }
  }
})

export const { setAirlineFilter, setAirportFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;