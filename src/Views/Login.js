import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

import { Typography } from '@material-ui/core';

class Login extends Component{
    constructor(props){
        super();
        this.state = {emailAddress:'', password:''};
        this.loginPressed = this.loginPressed.bind(this);
    }

    componentDidMount(){
    }

    loginPressed(){
        const self = this;
        fetch('http://localhost:4000/users/authenticate', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({username:self.state.emailAddress, password:self.state.password})
        }).then(function(response){
            console.log(response);
            if(response.status == 500){
                return {status:500};
            }
            return response.json();
        }).then(function(data){
            if(data.status == 500){
                
            } else{
                console.log("logged in!");
                localStorage.setItem('token', data.token);
            }
        });
    }
    
    render(){
        
        return(
            <Grid container direction="row" justify="center" alignItem="center" style={{marginTop:150}}>
                <Grid item xs={5}>
                    <Paper style={{padding:0, paddingBottom:10}}>
                        <Paper style={{width:'100%', paddingTop:5, paddingBottom:5, backgroundColor:this.props.theme.palette.primary.main, borderTopLeftRadius:4 , borderTopRightRadius:4}} elevation={1} square>
                            <Typography align='center' variant='h6' style={{color:'white'}}>Login</Typography>
                        </Paper>
                        <Grid container direction="row" justify="center" alignItem="center" spacing={2} style={{paddingTop:10}}>
                            <Grid item xs={10}>
                                <TextField 
                                    label="Username"
                                    type="text"
                                    autoComplete="current-password"
                                    variant="standard" style={{width:'100%'}}/>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField 
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard" style={{width:'100%'}}/>
                            </Grid>
                            <Grid item xs={10}>
                                <Button variant="contained" color="primary" style={{width:"100%"}}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>    
                </Grid>
                
            </Grid>
        )
    }
}

export default withTheme(Login);