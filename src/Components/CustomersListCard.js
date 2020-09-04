import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';
import { min } from 'date-fns';
import { Typography } from '@material-ui/core';


class CustomersListCard extends Component{
    constructor(props){
        super(props);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setDate(minDate.getDate()-1);
        maxDate.setDate(maxDate.getDate()+1);
        this.state = {customers:[], loading:true, searchFilters:{startDate: minDate, endDate: maxDate}}
        this.timePickerRef = React.createRef()
        this.activateTimePicker = this.activateTimePicker.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
        this.getTimeString = this.getTimeString.bind(this);
        this.getActiveCustomerCount = this.getActiveCustomerCount.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
        this.initCustomers = this.initCustomers.bind(this);
        this.onStartDateSelected = this.onStartDateSelected.bind(this);
        this.onEndDateSelected = this.onEndDateSelected.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
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
        this.searchWithFilters({...this.state.searchFilters, ...{value:searchValue}})
    }

    searchWithFilters(filters){
        const self = this;
        if(filters.value == undefined || filters.value == null)
            filters.value = "";
        self.setState({searchFilters:filters});
        fetch('http://localhost:4000/customer/search/'+filters.value+"?startDate="+filters.startDate.toISOString()+"&endDate="+filters.endDate.toISOString(), {
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

    onStartDateSelected(date){
        let updatedState = this.state.searchFilters;
        updatedState['startDate'] = date;
        this.searchWithFilters(updatedState)
    }

    onEndDateSelected(date){
        let updatedState = this.state.searchFilters;
        updatedState['endDate'] = date;
        this.searchWithFilters(updatedState)
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
        this.setState({searchLoading:true})
        fetch('http://localhost:4000/customer/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+localStorage.getItem('token')
            }
            }).then(function(response){
                return response.json();
            }).then(function(data){
                let stateUpdate = {customers:data, loading:false, searchLoading:false}
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

    clearFilters(){
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setDate(minDate.getDate()-1);
        maxDate.setDate(maxDate.getDate()+1);
        this.setState({searchFilters:{startDate: minDate, endDate: maxDate}})
        this.initCustomers()
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
                    onChange={this.onSearchFieldChange}
                    value={this.state.searchFilters.value ? this.state.searchFilters.value : ''}/>
                    <DatePicker
                        label="Between"
                        format="dd/MM/yy"
                        style={{marginTop:15, width:'50%'}}
                        onChange={this.onStartDateSelected}
                        value={this.state.searchFilters.startDate}/>
                    <DatePicker
                        label="and"
                        format="dd/MM/yy"
                        style={{marginTop:15, width:'50%'}}
                        onChange={this.onEndDateSelected}
                        value={this.state.searchFilters.endDate}/>
                    <Button style={{width:'100%', marginTop:10, paddingBottom:0}} onClick={this.clearFilters}>CLEAR FILTERS</Button>
                    <List style={{minHeight:50}}>
                        { this.state.customers.length > 0 && this.state.customers.map((item, index)=>(
                            <ListItem>
                                <Grid container>
                                    <Typography component={Grid} item variant='h7' style={{float:'left', width:'100%', cursor:'pointer'}} onClick={()=>this.searchWithFilters({...this.state.searchFilters, ...{value:item.phoneNumber}})}>{item.phoneNumber}</Typography>
                                    <Grid item>
                                        <Typography variant='h7' style={{color:'grey', fontSize:14}}>{this.getTimeString(item.entryTimestamp)} </Typography>
                                        -
                                        <Typography 
                                            variant='h7' 
                                            style={{color:'grey', fontSize:14, cursor:(item.departureTimestamp ? 'default' : 'pointer')}}
                                            onClick={()=>{
                                                if(item.departureTimestamp == null)
                                                    this.activateTimePicker(item.id)
                                            }}> {(item.departureTimestamp ? (this.getTimeString(item.departureTimestamp)) : "N/A")}</Typography>
                                    </Grid>
                                    
                                </Grid>
                                
                            </ListItem>
                        ))} 
                        {this.state.noResults && <h6 style={{width:'100%', textAlign:'center'}}>No results</h6>}
                        {this.state.searchLoading && <div 
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
            </Card>
            </MuiPickersUtilsProvider>
        )
    }
}

export default CustomersListCard;