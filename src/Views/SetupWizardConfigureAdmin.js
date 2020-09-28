import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class SetupWizardConfigureAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {passwordValue:''};
        this.onPasswordFieldChange = this.onPasswordFieldChange.bind(this);
    }

    componentDidMount(){
        const self = this;
        const setPassword = async function(){
            await axios.patch('/users',{
                password:self.state.passwordValue
            }).then(function(response){
            })
        }
        this.props.setOnNext(setPassword)
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