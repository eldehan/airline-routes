import React from 'react';
import DATA from './data'
import { getAirlineById, getAirportByCode } from "./data"
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import { setAirlineFilter, setAirportFilter, clearFilters } from "./reducers/filterReducer";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useDispatch();
  const { airlines, airports } = DATA

  useEffect(() => {
    dispatch(clearFilters())
  }, [])

  const routes = useSelector((state) => {
    let routes = state.routes

    if (state.filter.airlineFilter !== 'all') {
      routes = routes.filter(route => route.airline === state.filter.airlineFilter)
    }

    if (state.filter.airportFilter !== 'all') {
      routes = routes.filter(route => route.src === state.filter.airportFilter || route.dest === state.filter.airportFilter)
    }

    return routes
  })

  const columns = [
    { name: 'Airline', property: 'airline' },
    { name: 'Source Airport', property: 'src' },
    { name: 'Destination Airport', property: 'dest' },
  ];

  const formatData = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value)
    } else {
      return getAirportByCode(value)
    }
  }

  const airlineOptions = [
    { value: 'all', text: 'all' },
    ...airlines.map(airline => {
      return {
        value: airline.id,
        text: airline.name
      }
    })]

  const handleSelectAirline = (event) => {
    let selection = event.target.value
    if (selection === 'all') {
      dispatch(setAirlineFilter(selection))
    } else {
      dispatch(setAirlineFilter(Number(selection)));
    }
    // event.preventDefault();
  };

  const airportOptions = [
    { value: 'all', text: 'all' },
    ...airports.map(airport => {
      return {
        value: airport.code,
        text: airport.name
      }
    })]

  const handleSelectAirport = (event) => {
    let selection = event.target.value
    if (selection === 'all') {
      dispatch(setAirportFilter(selection))
    } else {
      dispatch(setAirportFilter(selection));
    }
    // event.preventDefault();
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <Select
          label={'Filter routes by airline'}
          name={'select-airlines'}
          options={airlineOptions}
          handleOnChange={handleSelectAirline}
        />
        <Select
          label={'Filter routes by airport'}
          name={'select-airport'}
          options={airportOptions}
          handleOnChange={handleSelectAirport}
        />
        <Table
          className="routes-table"
          columns={columns}
          rows={routes}
          format={formatData}
        />
      </section>
      <footer>
        <br />
      </footer>
    </div>
  )
}

export default App;