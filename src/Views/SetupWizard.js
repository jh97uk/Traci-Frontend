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
import SetupWizardConfigureEstablishment from './SetupWizardConfigureEstablishment.js';
import SetupWizardComplete from './SetupWizardComplete.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const stages = {
    'welcome':1,
    'configure-admin':2,
    'configure-establishment':3,
    'setup-complete':4
};

class SetupWizard extends Component{
    constructor(props){
        super(props);
        this.state = {loading:false}
        this.setStage = this.setStage.bind(this);
        this.nextStage = this.nextStage.bind(this);
        this.setNextAction = this.setNextAction.bind(this);
        this.getCurrentStage = this.getCurrentStage.bind(this);
        this.getTotalStageCount = this.getTotalStageCount.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    setStage(stageNumber){
        const stageNames = Object.keys(stages);
        this.props.history.push('/setup/'+stageNames[stageNumber]);
    }

    setLoading(loading){
        this.setState({loading:loading});
    }

    nextStage(){
        const self = this;
        if(this.state.nextAction){
            this.setState({loading:true})
            this.state.nextAction().then(function(){
                self.setState({loading:false, nextAction:undefined})
                self.setStage(stages[self.props.location.pathname.split('/')[2]]);
            }).catch(function(error){
                self.setState({loading:false})
                self.props.setSimpleAlert("Something went wrong...", error.response.data.message);
            })
        } else{
            if(this.getCurrentStage() == this.getTotalStageCount()){
                this.props.history.push('/login');
            } else{
                this.setStage(stages[this.props.location.pathname.split('/')[2]]);
            }
        }
            
    }

    setNextAction(func){
        this.setState({nextAction:func});
    }

    getCurrentStage(){
        return stages[this.props.location.pathname.split('/')[2]];
    }
    
    getTotalStageCount(){
        return Object.keys(stages).length;
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
        if(!stageRouteNames.includes(this.props.location.pathname.split('/')[2])){
            return <Redirect to={"/setup/welcome"} />
        }
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
                        <Route path={this.props.match.path+'/'+stageRouteNames[0]} render={(props)=><SetupWizardWelcome {...props} setOnNext={this.setNextAction} setLoading={this.setLoading} setSimpleAlert={this.props.setSimpleAlert}/>}/>
                        <Route path={this.props.match.path+'/'+stageRouteNames[1]} render={(props)=><SetupWizardConfigureAdmin {...props} setOnNext={this.setNextAction} setLoading={this.setLoading} setSimpleAlert={this.props.setSimpleAlert}/>}/>
                        <Route path={this.props.match.path+'/'+stageRouteNames[2]} render={(props)=><SetupWizardConfigureEstablishment {...props} setOnNext={this.setNextAction} setLoading={this.setLoading} setSimpleAlert={this.props.setSimpleAlert}/>}/>
                        <Route path={this.props.match.path+'/'+stageRouteNames[3]} render={(props)=><SetupWizardComplete {...props} setOnNext={this.setNextAction} setLoading={this.setLoading} setSimpleAlert={this.props.setSimpleAlert}/>}/>
                    </div>
                    <div style={{display:'flex', justifyContent: 'right', padding:10}}>
                        <label style={{marginRight:10, alignSelf:'center'}}>{this.getCurrentStage()} of {this.getTotalStageCount()}</label>
                        <Button variant="contained" color="primary" onClick={this.nextStage} disabled={this.state.loading}>
                            {this.state.loading ? <CircularProgress style={{height:25, width:25}}/> : ((this.getCurrentStage() == this.getTotalStageCount()) ? 'Finish' : 'NEXT')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetupWizard;