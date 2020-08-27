import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router';

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
        self.setState({loginInProgress:true})
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
                self.setState({
                    loginInProgress:false, 
                    showDialog:true,
                    dialogTitle:"Invalid credentials",
                    dialogContent:"Invalid username or password"})
            } else{
                localStorage.setItem('token', data.token);
                self.setState({
                    loginInProgress:false
                });
            }
        });
    }
    
    render(){
        if(localStorage.getItem('token'))
            return(<Redirect to={"/dashboard"}/>)
        return(
            <Grid container direction="row" justify="center" alignItem="center" style={{marginTop:150}}>
                <Grid item xs={8} sm={6} md={5} lg={3}>
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
                                    variant="standard" style={{width:'100%'}}
                                    onChange={event=>this.setState({username:event.target.value})}/>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField 
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="standard" 
                                    style={{width:'100%'}}
                                    onChange={event=>this.setState({password:event.target.value})}/>
                            </Grid>
                            <Grid item xs={10}>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    style={{width:"100%"}}
                                    onClick={this.loginPressed}
                                    disabled={this.state.loginInProgress}>
                                    Login
                                    {
                                        this.state.loginInProgress &&
                                        <CircularProgress 
                                        size={24}
                                        style={{
                                            position:'absolute',
                                            top:'50%',
                                            left: '50%',
                                            marginTop: -12,
                                            marginLeft: -12
                                        }}/>
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>    
                </Grid>

                <Dialog
                    open={this.state.showDialog}
                    onClose={()=>this.setState({showDialog:false})}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'>
                        <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {this.state.dialogContent}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.setState({showDialog:false})}>Ok</Button>
                        </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}

export default withTheme(Login);