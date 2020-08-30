import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class CustomersListCard extends Component{
    constructor(props){
        super(props);
        this.state = {customers:[]}
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
                self.props.customerCountSetter(data.length);
            })
    }

    render(){
        return(
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
                                    primary={item.phoneNumber}
                                    secondary={new Date(Date.parse(item.entryTimestamp)).getHours() + ":" + new Date(Date.parse(item.entryTimestamp)).getMinutes() + " - " + (item.departureTimestamp ? (new Date(Date.parse(item.departureTimestamp)).getHours() + ":" + new Date(Date.parse(item.departureTimestamp)).getMinutes()) : 'N/A')}/>
                            </ListItem>
                        ))}  
                    </List>
                </CardContent>
            </Card>
        )
    }
}

export default CustomersListCard;