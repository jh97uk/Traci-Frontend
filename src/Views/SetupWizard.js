import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SetupWizardWelcome from './SetupWizardWelcome.js';
import SetupWizardConfigureAdmin from './SetupWizardConfigureAdmin.js';
import SetupWizardComplete from './SetupWizardComplete.js';

const stages = {
    'welcome':1,
    'configure-admin':2,
    'setup-complete':3
};

class SetupWizard extends Component{
    constructor(props){
        super(props);
        this.state = {}
        this.setStage = this.setStage.bind(this);
        this.nextStage = this.nextStage.bind(this);
        this.setNextAction = this.setNextAction.bind(this);
    }

    componentDidMount(){
        const self = this;
    }

    setStage(stageNumber){
        const stageNames = Object.keys(stages);
        this.props.history.push('/setup/'+stageNames[stageNumber]);
        console.log("set called")

    }

    nextStage(){
        console.log(this.state);
        this.state.nextAction();
        this.setStage(stages[this.props.location.pathname.split('/')[2]]);
        console.log("Next called")

    }

    setNextAction(func){
        console.log("setting action")
        this.setState({nextAction:func});
    }

    render(){
        const style = {
            container:{
                display: "flex",
                flexFlow: "column",
                height: "100vh"
            }
        }  
        const stageRouteNames = Object.keys(stages);
        return(
            <div style={style.container}>
                <AppBar position="static">
                    <Toolbar>
                        <h1 style={{marginTop:0, marginBottom:0}}>Trac<i>i</i></h1>
                        <div style={{flexGrow:1}}></div>
                    </Toolbar>
                </AppBar>
                <div style={{display:'flex', flex: "1", flexDirection:"column"}}>
                    <div xs={12} style={{flexBasis:0, flexGrow:2,}}>
                        <Route path={this.props.match.path+'/'+stageRouteNames[0]} render={(props)=><SetupWizardWelcome {...props} setOnNext={this.setNextAction}/>}/>
                        <Route path={this.props.match.path+'/'+stageRouteNames[1]} render={(props)=><SetupWizardConfigureAdmin {...props} setOnNext={this.setNextAction}/>}/>
                        <Route path={this.props.match.path+'/'+stageRouteNames[2]} render={(props)=><SetupWizardComplete {...props} setOnNext={this.setNextAction}/>}/>
                    </div>
                    <div style={{display:'flex', justifyContent: 'right', padding:10}}>
                        <label style={{marginRight:10, alignSelf:'center'}}>{stages[this.props.location.pathname.split('/')[2]]} of {Object.keys(stages).length}</label>
                        <Button variant="contained" color="primary" onClick={this.nextStage}>NEXT</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetupWizard;