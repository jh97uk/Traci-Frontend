import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, TimePicker, DatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import TextField from '@material-ui/core/TextField';
import KeyboardDateInput from '@material-ui/pickers/_shared/KeyboardDateInput';
import { MuiThemeProvider, DialogTitle } from '@material-ui/core';

import SimpleAlertDialog from '../Components/SimpleAlertDialog.js';

class AddCustomerDialog extends Component{
    constructor(props){
        super()
        this.defaultState = {phoneNumber:'', entryDate:new Date(), entryTime:new Date(), departureDate: new Date(), departureTime: new Date(), loading:false, error:false};
        this.state = this.defaultState

        this.submitEntry = this.submitEntry.bind(this);
        
        this.onEntryDatePicked = this.onEntryDatePicked.bind(this);
        this.onEntryTimePicked = this.onEntryTimePicked.bind(this);

        this.onDepartureDatePicked = this.onDepartureDatePicked.bind(this);
        this.onDepartureTimePicked = this.onDepartureTimePicked.bind(this);

        this.onPhoneNumberChanged = this.onPhoneNumberChanged.bind(this);
    }

    onEntryDatePicked(date){
        this.setState({entryDate:date});
    }
    
    onEntryTimePicked(time){
        this.setState({entryTime:time});
    }

    onDepartureDatePicked(date){
        this.setState({departureDate:date});
    }

    onDepartureTimePicked(time){
        this.setState({departureTime:time});
    }

    onPhoneNumberChanged(event){
        this.setState({phoneNumber:event.target.value});
    }
    
    submitEntry(){
        const self = this;

        let entryTimestamp = self.state.entryDate;
        let departureTimestamp = self.state.departureDate;

        entryTimestamp.setHours(self.state.entryTime.getHours());
        entryTimestamp.setMinutes(self.state.entryTime.getMinutes());
        entryTimestamp.setSeconds(self.state.entryTime.getSeconds());

        departureTimestamp.setHours(self.state.departureTime.getHours());
        departureTimestamp.setMinutes(self.state.departureTime.getMinutes());
        departureTimestamp.setSeconds(self.state.departureTime.getSeconds());
        self.setState({loading:true});
        fetch('http://localhost:4000/customer/entry', {
            method:'POST',
            headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({
                number:self.state.phoneNumber,
                entryTimestamp:entryTimestamp,
                departureTimestamp:departureTimestamp
            })
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.error){
                self.setState({error:{title:'Something went wrong...', message:data.error}, loading:false});
                return;
            }
            self.setState(self.defaultState);
            self.props.onClose(data)
        })
    }

    render(){
        return(
            <MuiThemeProvider>
                <Dialog 
                    open={this.props.open}
                    onClose={this.props.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                        <DialogContent>
                            <TextField label="Phone Number" style={{width:'100%', marginBottom:15}} value={this.state.phoneNumber} onChange={this.onPhoneNumberChanged} disabled={this.state.loading}/>
                            <div style={{width:'100%', marginBottom:15}}>
                                <DatePicker
                                    format='dd/MM/yy'
                                    label='Entry date'
                                    value={this.state.entryDate}
                                    onChange={this.onEntryDatePicked}
                                    style={{width:'50%'}}
                                    disabled={this.state.loading}/>
                                <TimePicker
                                    clearable
                                    ampm={false}
                                    label="Entry time"
                                    value={this.state.departureTime}
                                    onChange={this.onEntryTimePicked}
                                    style={{width:'50%'}}
                                    disabled={this.state.loading}/>
                            </div>

                            <div style={{width:'100%'}}>
                                <DatePicker
                                    format='dd/MM/yy'
                                    label='Departure date'
                                    value={this.state.departureDate}
                                    onChange={this.onDepartureDatePicked}
                                    style={{width:'50%'}}
                                    disabled={this.state.loading}/>
                                <TimePicker
                                    clearable
                                    ampm={false}
                                    label="Departure time"
                                    value={this.state.departureTime}
                                    onChange={this.onDepartureTimePicked}
                                    style={{width:'50%'}}
                                    disabled={this.state.loading}/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>this.props.onClose()}>Cancel</Button>
                            {this.state.loading ? 
                                <CircularProgress style={{
                                    width:20,
                                    height:20,
                                    marginRight:10,
                                    marginTop:-4
                                }}></CircularProgress>
                                    :
                                <Button color="primary" onClick={()=>this.submitEntry()} autoFocus>Add entry</Button>
                            }
                            
                        </DialogActions>
                </Dialog>
                <SimpleAlertDialog title={this.state.error.title} message={this.state.error.message} show={this.state.error} onClose={()=>this.setState({error:false})}/>
            </MuiThemeProvider>)
    }
}

export default AddCustomerDialog;