import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Game from './Pages/Game';
import logo from './trivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>SUA VEZ</p>
        <Route exact path="/" component={ Login } />
      </header>
      <Switch>
        <Route exact path="/game" component={ Game } />
      </Switch>
    </div>
  );
}
