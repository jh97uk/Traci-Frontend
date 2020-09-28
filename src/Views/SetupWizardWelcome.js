import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
class SetupWizardWelcome extends Component{
    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        this.props.setOnNext(undefined);
    }

    render(){
        console.log('test');
        return(
        <div style={{width:"100%", height:"100%", background:'#eee'}}>
            <Grid container xs={12} justify="center">
                <Grid component={Card} item xs={10} md={6} style={{marginTop:25}}>
                    <CardContent>
                        <Typography variant='h4'>Welcome!</Typography>
                        <p>Welcome to Traci, the worlds first <b>open source</b> track and trace kiosk!</p>
                        <p>
                            <b>Please pay attention:</b><br/>
                            Due to the sensitive nature of the data kept in this application, please assure you assign a <b>secure administrators password</b>.<br/><br/>
                            Please also note that I don't take any responsibility for what may happen to users data in any way shape or form.<br/><br/>In order for Traci to be as secure as possible, it <b>MUST</b> be ran in an airgapped environment with <b>NO INTERNET ACCESS</b> and a secure WiFi password.
                        </p>
                    </CardContent>
                </Grid>
            </Grid>
        </div>)
    }
}

export default SetupWizardWelcome;