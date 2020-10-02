import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class SetupWizardConfigureEstablishment extends Component{
    constructor(props){
        super(props);
        this.state = {estbablishmentName:'', estbalishmentMessage:''};

        this.onEstablishmentNameFieldChange = this.onEstablishmentNameFieldChange.bind(this);
        this.onEstablishmentMessageFieldChange = this.onEstablishmentMessageFieldChange.bind(this);
    }

    componentDidMount(){
        const self = this;
        const setPassword = async function(){
            await axios.post('/setup/establishment',{
                establishmentName:self.state.establishmentName,
                establishmentMessage:self.state.establishmentMessage
            }).then(function(response){
            })
        }
        this.props.setOnNext(setPassword)
    }

    onEstablishmentNameFieldChange(event){
        const value = event.target.value;
        this.setState({establishmentName:value});
    }

    onEstablishmentMessageFieldChange(event){
        const value = event.target.value;
        this.setState({establishmentMessage:value});
    }

    render(){
        return(
            <div style={{width:"100%", height:"100%", background:'#eee'}}>
                <Grid container xs={12} justify="center">
                    <Grid component={Card} item xs={10} md={6} style={{marginTop:25}}>
                        <CardContent>
                            <Typography variant='h4'>Let's get personal</Typography>
                            <p>Awesome. Now we're done setting up the admin portion of Traci, we now need to <b>personalize it</b> for your establishment.<br/>
                            Type the <b>name</b> of your place below, and don't forget to fill out an aditional <b>sub header message</b> too! These will both be displayed on the kiosk page where customers will scan in their code.</p>
                            <TextField 
                                label="Establishment name" 
                                style={{width:'100%'}} 
                                value={this.state.establishmentName}
                                onChange={this.onEstablishmentNameFieldChange} 
                                disabled={this.state.loading}/>
                                <TextField 
                                label="Sub header"
                                style={{width:'100%', marginTop:10}} 
                                value={this.state.establishmentMessage}
                                onChange={this.onEstablishmentMessageFieldChange} 
                                disabled={this.state.loading}/>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>)
    }
}

export default SetupWizardConfigureEstablishment;