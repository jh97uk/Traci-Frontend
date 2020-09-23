import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {withTheme} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
        const self = this;
        self.setState({loading:true});
        axios.delete('/customer', {}).then(function(response){
            self.setState({loading:false, clearDatabaseWarningShow:false});
        }).catch(function(error){

        });
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
            <div>
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
                        <Button onClick={()=>this.setState({clearDatabaseWarningShow:true})} style={{width:'100%'}}>CLEAR DATABASE</Button>
                        <Button onClick={this.saveSettings} variant="contained" color="primary" style={{marginTop:10}}>SAVE</Button>
                    </CardContent>
                </Card>

                <Dialog 
                    open={this.state.clearDatabaseWarningShow}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <Typography variant="h4">Are you sure?</Typography>
                            <p>Are you sure you want to clear the database? All the entries will be DELETED.</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>{
                                    this.setState({clearDatabaseWarningShow:false})
                                }}>Cancel</Button>
                            {this.state.loading ? 
                                <CircularProgress style={{
                                    width:20,
                                    height:20,
                                    marginRight:10,
                                    marginTop:-4
                                }}></CircularProgress>
                                    :
                            <Button color="primary" onClick={()=>{
                                this.clearDatabase();
                            }} autoFocus>{this.state.edit ? "Save" : "Add entry" }</Button>
                            }
                            
                        </DialogActions>
                </Dialog>
            </div>)
    }
}

export default DashboardSettings;