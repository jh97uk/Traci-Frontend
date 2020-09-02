import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';


class CustomersListCard extends Component{
    constructor(props){
        super(props);
        this.state = {customers:[], loading:true}
        this.timePickerRef = React.createRef()
        this.activateTimePicker = this.activateTimePicker.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
        this.getTimeString = this.getTimeString.bind(this);
        this.getActiveCustomerCount = this.getActiveCustomerCount.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
        this.initCustomers = this.initCustomers.bind(this);
        this.currentEditngIndex = null;
    }

    onSearchFieldChange(event){
        const self = this;
        const searchValue = event.target.value;
        if(searchValue.length < 1){
            this.initCustomers();
            return;
        }
        self.setState({searchLoading:true});
        fetch('http://localhost:4000/customer/search/'+searchValue, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                let stateUpdate = {customers:data, searchLoading:false};
                if(data.length < 1)
                    stateUpdate['noResults'] = true
                    else
                    stateUpdate['noResults'] = false
                self.setState(stateUpdate);
            })
    }

    activateTimePicker(index){
        this.currentEditngIndex = index;
        this.timePickerRef.current.click();
    }

    onTimePicked(date){
        const self = this;
        self.setState({loading:true});
        fetch('http://localhost:4000/customer/'+this.currentEditngIndex, {
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({departureTimestamp:date})
        }).then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            fetch('http://localhost:4000/customer/'+self.currentEditngIndex, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+localStorage.getItem('token')
                }
                }).then(function(response){
                    return response.json();
                }).then(function(data){
                    self.state.customers.forEach(customer => {
                        if(customer.id == self.currentEditngIndex){
                            const updatedCustomerArray = self.state.customers;
                            const id = self.state.customers.indexOf(customer)
                            updatedCustomerArray[id] = {...updatedCustomerArray[id], ...data[0]}
                            self.setState({customers:updatedCustomerArray, loading:false})
                            self.props.customerCountSetter(updatedCustomerArray.length, self.getActiveCustomerCount());
                        }
                    });
                })
        });
    }

    getActiveCustomerCount(){
        let activeCustomerCount = 0;
        for (const customer in this.state.customers) {
            if (this.state.customers.hasOwnProperty(customer)) {
                if(this.state.customers[customer].departureTimestamp == null)
                    activeCustomerCount+=1
            }
        }
        return activeCustomerCount
    }

    initCustomers(){
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
                let stateUpdate = {customers:data, loading:false}
                if(data.length < 1)
                    stateUpdate['noResults'] = true
                    else
                    stateUpdate['noResults'] = false
                self.setState(stateUpdate);
                self.props.customerCountSetter(data.length, self.getActiveCustomerCount());
            })
    }

    componentDidMount(){
        this.initCustomers();
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
            <Card style={{position:'relative'}}>
                <CardContent>
                    <TextField
                    id="outlined-required"
                    label="Search number"
                    defaultValue=""
                    style={{width:'100%'}}
                    onChange={this.onSearchFieldChange}/>
                    <List>
                        { this.state.customers.length > 0 && this.state.customers.map((item, index)=>(
                            <ListItem>
                                <ListItemText
                                    onClick={()=>{
                                        if(item.departureTimestamp == null)
                                            this.activateTimePicker(item.id)
                                    }}
                                    primary={item.phoneNumber}
                                    secondary={
                                        this.getTimeString(item.entryTimestamp)
                                        + " - " + 
                                        (item.departureTimestamp ? (this.getTimeString(item.departureTimestamp)) : "N/A")}/>
                            </ListItem>
                        ))} 
                    </List>
                </CardContent>
                {this.state.loading && 
                    <div 
                        style={{
                            position:'absolute',
                            top:0,
                            zIndex:123,
                            width:'100%',
                            height:'100%',
                            backgroundColor:'rgba(230, 230, 230, 0.9)',
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center'}}>
                        <CircularProgress></CircularProgress>
                    </div>}
                {this.state.noResults && <h6 style={{width:'100%', textAlign:'center', marginTop:0}}>No results</h6>}
            </Card>
            </MuiPickersUtilsProvider>
        )
    }
}

export default CustomersListCard;