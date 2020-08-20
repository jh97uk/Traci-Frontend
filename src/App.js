import React, {Component} from 'react';
import './App.css';
import Kiosk from './Views/Kiosk.js';
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
            <Route path="/" render={(props)=><Kiosk {...props}/>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
