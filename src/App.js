import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DATA from './data'
import { getAirlineById, getAirportByCode } from "./data"
import './App.css';
import { setAirlineFilter, setAirportFilter, clearFilters } from "./reducers/filterReducer";
import Table from './components/Table';
import Select from './components/Select';
import Map from './components/Map';

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
      return getAirlineById(value).name
    } else {
      return getAirportByCode(value).name
    }
  }

  const airlineOptions = [
    { value: 'all', text: 'all airlines' },
    ...airlines.map(airline => {
      return {
        value: airline.id,
        text: airline.name
      }
    })]

  const filteredAirlineOptions = airlineOptions.map(airlineOption => {
    let active = !!routes.find(
      (route) => route.airline === airlineOption.value
    );

    if (airlineOption.value === 'all') {
      active = true
    }

    return {
      ...airlineOption,
      active
    }
  })

  const airportOptions = [
    { value: 'all', text: 'all airports', },
    ...airports.map(airport => {
      return {
        value: airport.code,
        text: airport.name
      }
    })]

  const filteredAirportOptions = airportOptions.map(airportOption => {
    let active = !!routes.find(
      (route) => route.src === airportOption.value || route.dest === airportOption.value
    );

    if (airportOption.value === 'all') {
      active = true
    }

    return {
      ...airportOption,
      active
    }
  })

  const handleSelectAirline = (event) => {
    let selection = event.target.value
    if (selection === 'all') {
      dispatch(setAirlineFilter(selection))
    } else {
      dispatch(setAirlineFilter(Number(selection)));
    }
  };

  const handleSelectAirport = (event) => {
    let selection = event.target.value
    if (selection === 'all') {
      dispatch(setAirportFilter(selection))
    } else {
      dispatch(setAirportFilter(selection));
    }
  };

  const handleShowAllRoutes = (event) => {
    event.preventDefault()
    dispatch(clearFilters())
    event.target.parentElement.reset()
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map routes={routes} />
        <form>
          <Select
            label='Filter routes by'
            name='select-airlines'
            options={filteredAirlineOptions}
            handleOnChange={handleSelectAirline}
            enabledKey='active'
          />
          <Select
            label={'Filter routes by'}
            name={'select-airport'}
            options={filteredAirportOptions}
            handleOnChange={handleSelectAirport}
            enabledKey='active'
          />
          <button onClick={handleShowAllRoutes}>Show All Routes</button>
        </form>
        <br />
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