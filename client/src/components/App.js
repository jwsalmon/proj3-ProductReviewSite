import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './App.css';
import Products from './Products/Products';
import ProductSingle from './Products/ProductSingle';
import UserLogin from './Users/UseLogin';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">

          <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">Product Reveiw Site</a>
              <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><Link to={`/`}>User Login</Link></li>
                <li><Link to={`/usersignup`}>User Sign Up</Link></li>
                <li><Link to={`/product`}>Product Search</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <Switch>
          <Route exact path="/" component={UserLogin} />
          <Route exact path="/product" component={Products} />
          <Route exact path="/product/:id" component={ProductSingle} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
