import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import DashboardIcon from '@material-ui/icons/Dashboard';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {}
        this.handleProfileMenuOpen = this.handleProfileMenuOpen.bind(this);
        this.handleProfileMenuClose = this.handleProfileMenuClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){

    }

    handleProfileMenuOpen(event){
        this.setState({currentAnchor:event.currentTarget});
    }

    handleProfileMenuClose(event){
        this.setState({currentAnchor:undefined});
    }

    handleLogout(event){
        this.setState({currentAnchor:undefined, loginRedirect:true});
        localStorage.setItem('token', undefined);
    }


    render(){
        if(this.state.loginRedirect){
            return (<Redirect to={"/login"}/>)
        }
        const style = {
            container:{
                display: "flex",
                flexFlow: "column",
                height: "100vh"
            },
            sidebar:{
                height:'100%'
            }
        }
        
        const profileItem = (<MenuItem>
            <IconButton
                aria-label="Your account"
                aria-controls="primary-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleProfileMenuOpen}>
                    <AccountCircle/>
            </IconButton>
        </MenuItem>)

        const logoutRedirect = {

        }

        return(
            <div style={style.container}>
                <AppBar position="static">
                    <Toolbar>
                        <h1 style={{marginTop:0, marginBottom:0}}>Trac<i>i</i></h1>
                        <div style={{flexGrow:1}}></div>
                        {profileItem}
                        {
                            this.state.currentAnchor && (<Menu
                                open={true}
                                onClose={this.handleProfileMenuClose}
                                anchorEl={this.state.currentAnchor}
                            >
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>)
                        }
                    </Toolbar>
                </AppBar>
                <Grid container style={{display:'flex', flex: "1 1 auto", flexDirection:"row"}}>
                    <Grid item sm={4} md={3} lg={2} style={style.sidebar}>
                        <Paper style={{
                            height:'100%',
                            width:'100%',
                            backgroundColor:grey[100]
                        }}>
                            <List component='nav' aria-label="dashboard">
                                <ListItem button>
                                    <ListItemIcon>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard;