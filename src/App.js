import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a  href="/" className="navbar-brand">Navbar</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/create'} className="nav-link">Create</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/index'} className="nav-link">Index</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <br />
            <h6>Welcome To Your Blog</h6> <br />
            <Switch>
              <Route exact path='/create' component={Create} />
              <Route path='/edit/:id' component={Edit} />
              <Route path='/index' component={Index} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
