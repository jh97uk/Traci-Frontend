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
import { MuiThemeProvider } from '@material-ui/core';

class AddCustomerDialog extends Component{
    constructor(props){
        super()

        this.state = {phoneNumber:'', entryDate:new Date(), entryTime:new Date(), departureDate: new Date(), departureTime: new Date()};

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
                            <TextField label="Phone Number" style={{width:'100%', marginBottom:15}} value={this.state.phoneNumber} onChange={this.onPhoneNumberChanged}/>
                            <div style={{width:'100%', marginBottom:15}}>
                                <DatePicker
                                    format='dd/MM/yy'
                                    label='Entry date'
                                    value={this.state.entryDate}
                                    onChange={this.onEntryDatePicked}
                                    style={{width:'50%'}}/>
                                <TimePicker
                                    clearable
                                    ampm={false}
                                    label="Entry time"
                                    value={this.state.departureTime}
                                    onChange={this.onEntryTimePicked}
                                    style={{width:'50%'}}/>
                            </div>

                            <div style={{width:'100%'}}>
                                <DatePicker
                                    format='dd/MM/yy'
                                    label='Departure date'
                                    value={this.state.departureDate}
                                    onChange={this.onDepartureDatePicked}
                                    style={{width:'50%'}}/>
                                <TimePicker
                                    clearable
                                    ampm={false}
                                    label="Departure time"
                                    value={this.state.departureTime}
                                    onChange={this.onDepartureTimePicked}
                                    style={{width:'50%'}}/>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button>Cancel</Button>
                            <Button color="primary" onClick={this.submitEntry} autoFocus>Add entry</Button>
                        </DialogActions>
                </Dialog>
            </MuiThemeProvider>)
    }
}

export default AddCustomerDialog;