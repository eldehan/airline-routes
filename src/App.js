import React, { Component } from 'react';
import DATA from './data'
import './App.css';

const App = () => {
  const { routes } = DATA
  console.log(routes)

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
            {routes.map((route, index) => {
              return (
                <tr key={index}>
                  <td>{route.airline}</td>
                  <td>{route.src}</td>
                  <td>{route.dest}</td>
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