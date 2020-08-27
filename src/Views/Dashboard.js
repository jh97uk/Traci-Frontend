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
                <div style={{flex: "1 1 auto"}}>
                    <h2>Content here</h2>
                </div>
            </div>
        )
    }
}

export default Dashboard;