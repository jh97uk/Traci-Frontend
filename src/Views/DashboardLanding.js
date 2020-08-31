import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import CustomersListCard from '../Components/CustomersListCard.js';


class DashboardLanding extends Component{
    constructor(props){
        super(props);
        this.state = {customerCount:null, activeCustomerCount:null}
        this.updateSelectedDayCustomerNumber = this.updateSelectedDayCustomerNumber.bind(this);
    }

    componentDidMount(){
        const self = this;
    }

    updateSelectedDayCustomerNumber(customerCount, activeCustomerCount){
        this.setState({customerCount:customerCount, activeCustomerCount:activeCustomerCount});
    }

    render(){
        return(
            <div style={{maxHeight:'100vh', padding:20}}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CustomersListCard
                            customerCountSetter={this.updateSelectedDayCustomerNumber}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container
                            direction="row"
                            xs={12}
                            spacing={2}>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={3}>
                                    <Card
                                        style={{backgroundColor:this.props.theme.palette.secondary.main, position:'relative', width:'100%', height:'100%'}}>
                                            <CardContent>
                                                <Typography variant='h8' style={{color:'white', width:"100vh"}}>TODAYS CUSTOMERS</Typography>
                                                <Typography variant='h3' style={{color:'white', width:"100vh"}}>{(this.state.customerCount !== null) ? this.state.customerCount : 'N/A'}</Typography>
                                            </CardContent>
                                            {(this.state.customerCount === null) && (
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
                                                </div>)}
                                    </Card>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    lg={3}>
                                        <Card
                                        style={{backgroundColor:this.props.theme.palette.secondary.main, position:'relative', width:'100%', height:'100%'}}>
                                            <CardContent>
                                                <Typography variant='h8' style={{color:'white', width:"100vh"}}>ACTIVE CUSTOMERS</Typography>
                                                <Typography variant='h3' style={{color:'white', width:"100vh"}}>{(this.state.customerCount !== null) ? this.state.activeCustomerCount : 'N/A'}</Typography>
                                            </CardContent>
                                            {(this.state.customerCount === null) && (
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
                                                </div>)}
                                    </Card>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
                
        )
    }
}

export default withTheme(DashboardLanding);