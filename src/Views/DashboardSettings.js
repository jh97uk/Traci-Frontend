import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withTheme} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class DashboardSettings extends Component{
    constructor(props){
        super(props);
        this.state = {passwordValue:'', loading:false};
        this.onPasswordFieldChange = this.onPasswordFieldChange.bind(this);
        this.clearDatabase = this.clearDatabase.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    onPasswordFieldChange(event){
        const value = event.target.value;
        this.setState({passwordValue:value});
    }

    clearDatabase(){

    }

    saveSettings(){
        const self = this;
        axios.patch('/users',{
            password:self.state.passwordValue
        }).then(function(response){
            console.log(response);
        }).catch(function(error){
        });
    }

    render(){
        return(
            <div style={{padding:20}}>
                <Card>
                    <CardContent>
                        <Typography variant="h4">SETTINGS</Typography>
                        <TextField 
                                label="Dashboard password"
                                type="password" 
                                style={{width:'100%', marginBottom:15}} 
                                value={this.state.passwordValue}
                                onChange={this.onPasswordFieldChange} 
                                disabled={this.state.loading}/>
                        <Button onClick={this.clearDatabase}>CLEAR DATABASE</Button>
                        <Button onClick={this.saveSettings}>SAVE</Button>
                    </CardContent>
                </Card>
            </div>)
    }
}

export default DashboardSettings;