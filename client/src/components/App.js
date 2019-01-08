import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Products from './Products/Products';
import ProductSingle from './Products/ProductSingle';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My feed</h1>
        </header>
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/product/:id" component={ProductSingle} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
