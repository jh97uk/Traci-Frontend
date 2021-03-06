import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from "@material-ui/pickers";
import CircularProgress from '@material-ui/core/CircularProgress';
import { min } from 'date-fns';
import { Typography } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddEditCustomerDialog from './AddEditCustomerDialog.js';
import CustomerListItem from './CustomerListItem.js';
import SimpleAlertDialog from './SimpleAlertDialog.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import {DialogTitle} from '@material-ui/core';

const axios = require('axios');

class CustomersListCard extends Component{
    constructor(props){
        super(props);
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        maxDate.setHours(23, 59, 59, 0);
        this.state = {customers:[], loading:true, searchFilters:{startDate: minDate, endDate: maxDate}, searchOffset:0}
        this.timePickerRef = React.createRef()
        this.activateTimePicker = this.activateTimePicker.bind(this);
        this.onTimePicked = this.onTimePicked.bind(this);
        this.getActiveCustomerCount = this.getActiveCustomerCount.bind(this);
        this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
        this.initCustomers = this.initCustomers.bind(this);
        this.onStartDateSelected = this.onStartDateSelected.bind(this);
        this.onEndDateSelected = this.onEndDateSelected.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.onAddCustomerDialogClosed = this.onAddCustomerDialogClosed.bind(this);
        this.onMoreButtonPressed = this.onMoreButtonPressed.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.deleteEntryById = this.deleteEntryById.bind(this);

        this.addEditCustomerDialog = React.createRef();
        this.currentEditngIndex = null;
    }

    onSearchFieldChange(event){
        const self = this;
        let searchValue = event.target.value;
        if(searchValue.length < 1){
            searchValue = null
        }
        self.setState({searchLoading:true});
        this.searchWithFilters({...this.state.searchFilters, ...{value:searchValue}})
    }

    searchWithFilters(filters){
        const self = this;
        if(filters.value == undefined || filters.value == null)
            filters.value = "";
        self.setState({searchFilters:filters});

        axios.get('customer/search/'+filters.value+"?startDate="+filters.startDate+"&endDate="+filters.endDate+"&offset="+this.state.searchOffset).then(function(response){
            const data = response.data;
            let stateUpdate = {customers:data, searchLoading:false};
            self.setState(stateUpdate);
        }).catch(function(error){
        });
    }
    activateTimePicker(index){
        this.currentEditngIndex = index;
        this.timePickerRef.current.click();
    }

    onStartDateSelected(date){
        date.setHours(0, 0, 0, 0);
        let updatedState = this.state.searchFilters;
        updatedState['startDate'] = date;
        this.searchWithFilters(updatedState)
    }

    onEndDateSelected(date){
        date.setHours(23, 59, 59, 0)
        let updatedState = this.state.searchFilters;
        updatedState['endDate'] = date;
        this.searchWithFilters(updatedState)
    }

    onTimePicked(date){
        console.log('test');
        const self = this;
        self.setState({loading:true});

        axios.patch('customer/'+this.currentEditngIndex,{
            data:{departureTimestamp:date}
        }).then(function(response){
            const data = response;
            axios.get("http://localhost:4000/customer"+self.currentEditngIndex).then(function(response){
                const data = response;
                self.state.customers.forEach(customer => {
                    if(customer.id == self.currentEditngIndex){
                        const updatedCustomerArray = self.state.customers;
                        const id = self.state.customers.indexOf(customer)
                        updatedCustomerArray[id] = {...updatedCustomerArray[id], ...data[0]}
                        self.setState({customers:updatedCustomerArray, loading:false})
                        self.props.customerCountSetter(updatedCustomerArray.length, self.getActiveCustomerCount());
                    }
                });
            });
        }).catch(function(error){

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
        axios.get('customer/').then(function(response){
            const data = response.data;
            let customers = self.state.customers;
            let stateUpdate = {customers:data, loading:false, searchLoading:false}
            self.setState(stateUpdate);
            self.props.customerCountSetter(data.length, self.getActiveCustomerCount());
        }).catch(function(error){
            console.log(error);
        })
    }

    getCustomersWithOffset(offset){
        const self = this;
        self.setState({searchLoading:true})
        axios.get('customer/?offset='+offset).then(function(response){
            const data = response.data;
            let customers = self.state.customers.concat(data);
            self.setState({customers:customers, searchLoading:false, loading:false});
        }).catch(function(error){
        });
    }

    componentDidMount(){
        this.initCustomers();
    }

    

    clearFilters(){
        const minDate = new Date();
        const maxDate = new Date();
        minDate.setHours(0, 0, 0, 0);
        maxDate.setHours(23, 59, 59, 0);
        this.setState({searchFilters:{startDate: minDate, endDate: maxDate}})
        this.initCustomers()
    }

    onAddCustomerDialogClosed(data, index){
        console.log("editted");
        if(data){
            let customers = this.state.customers;
            if(!isNaN(index)){
                console.log(customers)
                customers[index] = data.entry;
            } else{
                customers.push(data.entry);
            }
            this.setState({showAddEditCustomerDialog:false, customers:customers, popupMenuItemId:undefined, popupMenuItemIndex:undefined, currentItem:undefined});
        } else{
            this.setState({showAddEditCustomerDialog:false, popupMenuItemId:undefined, popupMenuItemIndex:undefined, currentItem:undefined});
        }
    }

    onMoreButtonPressed(event, itemId, itemIndex){
        this.setState({currentAnchor:event.currentTarget, popupMenuItemId:itemId, popupMenuItemIndex:itemIndex});
    }

    handlePopupClose(event){
        this.setState({currentAnchor:undefined, popupMenuItemId:undefined, popupMenuItemIndex:undefined});
    }

    deleteEntryById(id, index){
        const self = this;
        axios.delete('customer/'+id).then(function(response){
            const data = response.data;
            let customers = self.state.customers;
            customers.splice(index, 1);
            self.setState({itemIsBeingDeleted:false, customers:customers, currentAnchor:undefined});
        }).catch(function(error){
        });
    }

    render(){ 
        return(
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {this.state.itemIsBeingDeleted &&
                <Dialog open={this.state.itemIsBeingDeleted}>
                    <DialogContent>
                        <DialogTitle>Are you sure you want to delete this entry?</DialogTitle>
                        <DialogActions>
                            <Button onClick={()=>this.setState({itemIsBeingDeleted:false})}>Cancel</Button>
                            <Button onClick={()=>this.deleteEntryById(this.state.popupMenuItemId, this.state.popupMenuItemIndex)}>Delete</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>}
                <TimePicker
                    clearable
                    ampm={false}
                    label="24 hours"
                    value={new Date()}
                    inputRef={this.timePickerRef}
                    onChange={this.onTimePicked}
                    style={{display:'none'}}/>
                <AddEditCustomerDialog 
                    open={this.state.showAddEditCustomerDialog} 
                    onClose={this.onAddCustomerDialogClosed} 
                    ref={this.addEditCustomerDialog}
                    currentItemIndex={this.state.currentItem ? this.state.customers.indexOf(this.state.currentItem) : undefined}/>
                <Card style={{position:'relative'}}>
                    <CardContent style={{paddingBottom:20}}>
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
                        <List style={{minHeight:50, maxHeight:200, overflow:'auto'}}>
                            { this.state.customers.length > 0 && this.state.customers.map((item, index)=>(
                                <CustomerListItem 
                                    phoneNumber={item.phoneNumber} 
                                    onNumberClicked={()=>this.searchWithFilters({...this.state.searchFilters, ...{startDate:item.entryTimestamp, endDate:item.departureTimestamp, value:''}})}
                                    item={item}
                                    index={index}
                                    editDepartureTime={this.activateTimePicker}
                                    onItemMoreButtonPressed={this.onMoreButtonPressed}
                                    onItemMoreButtonClosed={this.handlePopupClose}/>
                            ))} 
                            {this.state.customers.length < 1 && <h6 style={{width:'100%', textAlign:'center'}}>No results</h6>}
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
                            {this.state.customers.length >= 5 ? 
                                <Button onClick={()=>this.getCustomersWithOffset(this.state.customers.length+1)} style={{width:'100%'}}>MORE</Button>
                                :
                                ''
                            }
                        </List>
                        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:15}}>
                            <Fab color="primary" aria-label="add" size="small" onClick={()=>{
                                this.clearFilters();
                                this.initCustomers();
                            }} style={{marginRight:15}}>
                                <RefreshIcon />
                            </Fab>
                            <Fab color="primary" aria-label="add" size="small" onClick={()=>this.setState({showAddEditCustomerDialog:true})}>
                                <AddIcon />
                            </Fab>
                        </div>
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
                        {
                            this.state.currentAnchor && (
                            <Menu
                                open={true}
                                anchorEl={this.state.currentAnchor}
                                onClose={this.handlePopupClose}>
                                <MenuItem onClick={()=>{
                                        this.setState({showAddEditCustomerDialog:true, currentItem:this.state.customers[this.state.popupMenuItemIndex], currentAnchor:undefined})
                                        this.addEditCustomerDialog.current.setCurrentCustomerItem(this.state.customers[this.state.popupMenuItemIndex]);
                                    }}>Edit</MenuItem>
                                <MenuItem onClick={()=> this.setState({itemIsBeingDeleted:true, currentAnchor:undefined})}>Delete</MenuItem>
                            </Menu>)
                        }
                </Card>
            </MuiPickersUtilsProvider>
        )
    }
}

export default CustomersListCard;