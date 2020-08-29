import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



class DashboardLanding extends Component{
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
                console.log(new Date(Date.parse(data[0].entryTimestamp)).getHours())
            })
    }

    render(){
        return(
                <Grid container style={{display:'flex', flex: "1 1 auto", flexDirection:"row", height:'100%', padding:20}}>
                    <Card
                        component={Grid}
                        item
                        xs={6}>
                        <CardContent>
                            <TextField
                            id="outlined-required"
                            label="Search number"
                            defaultValue=""
                            style={{width:'100%'}}/>
                            <List>
                                {this.state.customers.map((item, index)=>(
                                    <ListItem>
                                        <ListItemText
                                            primary={item.phoneNumber}
                                            secondary={new Date(Date.parse(item.entryTimestamp)).getHours() + ":" + new Date(Date.parse(item.entryTimestamp)).getMinutes() + " - " + (item.departureTimestamp ? (new Date(Date.parse(item.departureTimestamp)).getHours() + ":" + new Date(Date.parse(item.departureTimestamp)).getMinutes()) : 'N/A')}/>
                                    </ListItem>
                                ))}
                                
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
        )
    }
}

export default DashboardLanding;