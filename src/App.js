import React, { Component } from 'react';
import DATA from './data'
import './App.css';

const App = () => {
  const { routes } = DATA
  const { getAirlineById, getAirportByCode } = DATA

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <p>
          Welcome to the app!
        </p>
        <table>
          <tbody>
            <tr>
              <th>Airline</th>
              <th>Source Airport</th>
              <th>Destination Airport</th>
            </tr>
            {routes.map((route, index) => {
              return (
                <tr key={index}>
                  <td>{getAirlineById(route.airline)}</td>
                  <td>{getAirportByCode(route.src)}</td>
                  <td>{getAirportByCode(route.dest)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default App;