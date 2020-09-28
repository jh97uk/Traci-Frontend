import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
class SetupWizardComplete extends Component{
    constructor(props){
        super(props);
        this.state = {passwordValue:''};
    }

    componentDidMount(){
        this.props.setOnNext(undefined);
    }

    render(){
        return(
            <div style={{width:"100%", height:"100%", background:'#eee'}}>
                <Grid container xs={12} justify="center">
                    <Grid component={Card} item xs={10} md={6} style={{marginTop:25}}>
                        <CardContent>
                            <Typography variant='h4'>Setup complete!</Typography>
                            <p>Thank you for chosing Traci. The setup is now complete.<br/>
                            You can navigate to <b>localhost/kiosk</b> to enter kiosk mode on the kiosk itself.
                            To administrate the kiosk or to investigate customer entries, navigate to <b>localhost/dashboard</b>.</p>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>)
    }
}

export default SetupWizardComplete;