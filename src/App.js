import React, {Component} from 'react';
import './App.css';
import Kiosk from './Views/Kiosk.js';
import Login from './Views/Login.js';
import Dashboard from './Views/Dashboard.js';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component{
  constructor(props){
    super();
    axios.interceptors.request.use(function(config){
      const token = localStorage.getItem("token");
      config.headers.Authorization = "Bearer "+token;
      console.log(config);
      return config;
    });
    axios.defaults.baseURL = 'http://localhost:4000/'
  }

  render(){
    return (
      <div className="appContainer">
        <Router>
          <Switch>
            <Route path="/login" render={(props)=><Login {...props}/>}/>
            <Route path='/dashboard' render={(props)=><Dashboard {...props}/>}/>
            <Route path="/" render={(props)=><Kiosk {...props}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
