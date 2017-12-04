import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { Link, Switch, Route, Redirect   } from 'react-router-dom'
import { Nav, NavItem, NavLink } from 'reactstrap';

import Calculator from './calculator.js'
import Illness from './illness';

class App extends Component {

  constructor() {
    super();

    this.state = {'page': 'wage'}
  }

  setActive(v) {
    this.setState({'page': v});
  }

  render() {
    var pensjaClass = "nav-link " + (this.state.page == 'wage' ? 'active' : '');
    var choroboweClass = "nav-link " + (this.state.page == 'illness' ? 'active' : '');

    return (
      <div style={ { 'margin': '5px' } }>
        <Nav tabs>
          <NavItem>            
            <Link to="/wage" onClick={ e => this.setActive('wage') }>
              <span className={pensjaClass}>Pensja</span>
            </Link>            
          </NavItem>

          <NavItem>
            <Link to="/illness" onClick={ e => this.setActive('illness') }>
              <span className={choroboweClass}>Chorobowe</span>
            </Link>
          </NavItem>
        </Nav>

        <div className="App" style={{ 'margin': '5px' }}>
          <div id="main">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/wage" />
              </Route>
              <Route path="/wage" component={Calculator} />
              <Route path="/illness" component={Illness} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
