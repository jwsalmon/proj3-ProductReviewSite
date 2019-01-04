import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './pages/Users';
import NoMatch from './pages/NoMatch';
import './App.css';

// const logger = require('../../server/util/logger');
// logger.log("Test");

class App extends Component {
  render() {
    return (
      <Router>
        <div>      
          <Switch>
            <Route exact path="/" component={Users} />
            <Route exact path="/users" component={Users} />
            <Route component={NoMatch}/>
          </Switch>     
        </div>
      </Router>    
    );
  }
}

export default App;
