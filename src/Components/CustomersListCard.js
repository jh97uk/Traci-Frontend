import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

class CustomersListCard extends Component{
    constructor(props){
        super(props);
        this.state = {customers:[]}
        this.timePickerRef = React.createRef()
        this.activateTimePicker = this.activateTimePicker.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
        this.getTimeString = this.getTimeString.bind(this);
    }

    activateTimePicker(event){
        console.log(event);
        this.timePickerRef.current.click();
    }

    onTimePicked(date){
        console.log(date);
    }

    componentDidMount(){
        const self = this;
        fetch('http://localhost:4000/customer/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                self.setState({customers:data});
                let activeCustomerCount = 0;
                for (const customer in data) {
                    if (data.hasOwnProperty(customer)) {
                        if(data[customer].departureTimestamp == null)
                            activeCustomerCount+=1
                    }
                }
                self.props.customerCountSetter(data.length, activeCustomerCount);

            })
    }

    getTimeString(date){
        const itemDate = new Date(Date.parse(date));
        return itemDate.getHours() + ":" + itemDate.getMinutes();
    }

    render(){
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                    clearable
                    ampm={false}
                    label="24 hours"
                    value={new Date()}
                    inputRef={this.timePickerRef}
                    onChange={this.onTimePicked}
                    style={{display:'none'}}/>
            <Card>
                <CardContent>
                    <TextField
                    id="outlined-required"
                    label="Search number"
                    defaultValue=""
                    style={{width:'100%'}}/>
                    <List>
                        { this.state.customers.length > 0 && this.state.customers.map((item, index)=>(
                            <ListItem>
                                <ListItemText
                                    onClick={this.activateTimePicker}
                                    primary={item.phoneNumber}
                                    secondary={
                                        this.getTimeString(item.entryTimestamp)
                                        + " - " + 
                                        (item.departureTimestamp ? (this.getTimeString(item.departureTimestamp)) : "N/A")}/>
                            </ListItem>
                        ))}  
                    </List>
                </CardContent>
            </Card>
            </MuiPickersUtilsProvider>
        )
    }
}

export default CustomersListCard;