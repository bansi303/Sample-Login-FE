
import './App.css';

import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from './components/login.component';
import { Home } from './components/home.component';
import { history } from './helper/history';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Route path="/" exact component={Login} />
          <Route path="/home/:username" component={Home} />
        </div>
      </Router>

    );
  }
}

export default App;