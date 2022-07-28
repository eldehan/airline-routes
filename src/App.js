import React, { Component } from 'react';
import { useState } from 'react';
import DATA from './data'
import { getAirlineById, getAirportByCode } from "./data"
import './App.css';
import Table from './components/Table';

const App = () => {
  const { routes } = DATA
  const [resultsPerPage, setResultsPerPage] = useState(25)


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

  const Select = ({ label, name, options, handleOnChange, optionsState }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} onChange={handleOnChange} value={optionsState}>
        {options.map(opt => {
          return <option key={name + opt.value} value={opt.value}>{opt.text}</option>
        })}
      </select>
    </div>
  )

  const perPageOptions = [
    { value: 25, text: '25' },
    { value: 50, text: '50' },
    { value: 75, text: '75' },
    { value: 100, text: '100' }
  ]

  const perPageOnChange = (event) => {
    setResultsPerPage(event.target.value)
  }

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
          label={'Results to show per page'}
          name={'select-per-page'}
          options={perPageOptions}
          handleOnChange={perPageOnChange}
          optionsState={resultsPerPage}
        />
        <Table
          className="routes-table"
          columns={columns}
          rows={routes}
          format={formatData}
          resultsPerPage={Number(resultsPerPage)}
        />
      </section>
      <footer>
        <br />
      </footer>
    </div>
  )
}

export default App;