import React, { Component } from 'react';
import Users from './pages/Users';
import NoMatch from './pages/NoMatch';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

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
    </Router>    );
  }
}

export default App;
