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
        this.onEstablishmentNameChange = this.onEstablishmentNameChange.bind(this);
        this.onEstablishmentMessageChange = this.onEstablishmentMessageChange.bind(this);
        this.saveEstablishmentSettings = this.saveEstablishmentSettings.bind(this);
    }

    onEstablishmentNameChange(event){
        const value = event.target.value;
        this.setState({establishmentName:value});
    }

    onEstablishmentMessageChange(event){
        const value = event.target.value;
        this.setState({establishmentMessage:value});
    }

    onPasswordFieldChange(event){
        const value = event.target.value;
        this.setState({passwordValue:value});
    }

    saveEstablishmentSettings(){
        const self = this;
        self.setState({loading:true});
        axios.patch('/setup/establishment',{
            establishmentName:self.state.establishmentName,
            establishmentMessage:self.state.establishmentMessage
        }).then(function(response){
            self.setState({loading:false});
        })
    }

    componentDidMount(){
        const self = this;
        axios.get('/kiosk').then(function(response){
            const data = response.data;
            self.setState({establishmentName:data.establishment.name, establishmentMessage:data.establishment.message});
          })
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
            self.props.setSimpleAlert("Something went wrong...", error.response.data.message);
        });
    }

    render(){
        return(
            <div style={{padding:20}}>
                <Card>
                    <CardContent>
                        <Typography variant="h4">ADMIN SETTINGS</Typography>
                        <TextField 
                                label="Dashboard password"
                                type="password" 
                                style={{width:'100%', marginBottom:15}} 
                                value={this.state.passwordValue}
                                onChange={this.onPasswordFieldChange} 
                                disabled={this.state.loading}/>
                        <Button onClick={()=>this.setState({clearDatabaseWarningShow:true})} style={{width:'100%'}}>CLEAR DATABASE</Button>
                        <div style={{display:'flex', width:'100%', marginTop:10, justifyContent: 'right'}}>
                            <Button onClick={this.saveSettings} variant="contained" color="primary">SAVE</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card style={{marginTop:15}}>
                    <CardContent>
                        <Typography variant="h4">KIOSK SETTINGS</Typography>
                        <TextField 
                            label="Establishment name"
                            style={{width:'100%', marginBottom:15}}
                            defaultValue=" "
                            value={this.state.establishmentName}
                            onChange={this.onEstablishmentNameChange} 
                            disabled={this.state.loading}/>
                        <TextField 
                            label="Establishment message"
                            style={{width:'100%', marginBottom:15}} 
                            defaultValue=" "
                            value={this.state.establishmentMessage}
                            onChange={this.onEstablishmentMessageChange} 
                            disabled={this.state.loading}/>
                        <div style={{display:'flex', width:'100%', marginTop:10, justifyContent: 'right'}}>
                            <Button onClick={this.saveEstablishmentSettings} variant="contained" color="primary">SAVE</Button>
                        </div>
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