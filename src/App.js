import React, { Component } from 'react';
import DATA from './data'
import { getAirlineById, getAirportByCode } from "./data"
import './App.css';
import Table from './components/Table';

const App = () => {
  const { routes } = DATA

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

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
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