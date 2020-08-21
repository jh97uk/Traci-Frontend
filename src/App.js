import React, {Component} from 'react';
import './App.css';
import Kiosk from './Views/Kiosk.js';
import Login from './Views/Login.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component{
  constructor(props){
    super();
  }

  render(){
    return (
      <div className="appContainer">
        <Router>
          <Switch>
            <Route path="/login" render={(props)=><Login {...props}/>}/>
            <Route path="/" render={(props)=><Kiosk {...props}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
