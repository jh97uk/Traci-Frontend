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
import { Card, CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

class SetupWizardConfigureAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {passwordValue:''};
        this.onPasswordFieldChange = this.onPasswordFieldChange.bind(this);
    }

    componentDidMount(){
        const self = this;
        this.props.setOnNext(function(){
            alert();
        })
    }

    onPasswordFieldChange(event){
        const value = event.target.value;
        this.setState({passwordValue:value});
    }

    render(){
        return(
            <div style={{width:"100%", height:"100%", background:'#eee'}}>
                <Grid container xs={12} justify="center">
                    <Grid component={Card} item xs={10} md={6} style={{marginTop:25}}>
                        <CardContent>
                            <Typography variant='h4'>Admin setup</Typography>
                            <p>We now need to set the <b>admin password</b>, this gives you access to the dashboard of Traci where all the <b>sensitive information</b> is stored.<br/>
                            Please assure that the password you use is at least <b>15 characters long</b>, including <b>upper and lower case characters with numbers</b>, ideally including <b>special characters</b>.</p>
                            <TextField 
                                label="Dashboard password"
                                type="password" 
                                style={{width:'100%'}} 
                                value={this.state.passwordValue}
                                onChange={this.onPasswordFieldChange} 
                                disabled={this.state.loading}/>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>)
    }
}

export default SetupWizardConfigureAdmin;