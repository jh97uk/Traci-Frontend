import React, {Component} from 'react';
import './App.css';
import Kiosk from './Views/Kiosk.js';
import Login from './Views/Login.js';
import Dashboard from './Views/Dashboard.js';
import SetupWizard from './Views/SetupWizard.js';
import axios from 'axios';
import SimpleAlertDialog from './Components/SimpleAlertDialog.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

class App extends Component{
  constructor(props){
    super();
    this.state = {error:false};
    axios.interceptors.request.use(function(config){
      const token = localStorage.getItem("token");
      config.headers.Authorization = "Bearer "+token;
      console.log(config);
      return config;
    });
    this.onError = this.onError.bind(this);
    axios.defaults.baseURL = 'http://localhost:4000/'
  }

  onError(title, message){
    this.setState({
      error:{
        title:title, 
        message:message
      }
    });
  }

  render(){
    return (
      <div className="appContainer">
        <Router>
          <Switch>
            <Route path="/login" render={(props)=><Login {...props} setSimpleAlert={this.onError}/>}/>
            <Route path='/dashboard' render={(props)=><Dashboard {...props} setSimpleAlert={this.onError}/>}/>
            <Route path='/setup' render={(props)=><SetupWizard {...props} setSimpleAlert={this.onError}/>}/>
            <Route path="/" render={(props)=><Kiosk {...props} setSimpleAlert={this.onError}/>}/>
          </Switch>
        </Router>
        <SimpleAlertDialog title={this.state.error.title} message={this.state.error.message} show={this.state.error} onClose={()=>this.setState({error:false})}/>
      </div>
    );
  }
}

export default App;
