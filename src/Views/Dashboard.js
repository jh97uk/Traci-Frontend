import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const style = {
            container:{
                display: "flex",
                flexFlow: "column",
                height: "100vh"
            },
        }
        return(
            <div style={style.container}>
                <AppBar position="static">
                    <Toolbar>
                        <div style={{flexGrow:1}}></div>
                        <Button>Test</Button>
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