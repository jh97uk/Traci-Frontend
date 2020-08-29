import React, {Component} from 'react';

import Grid from '@material-ui/core/Grid';

import CustomersListCard from '../Components/CustomersListCard.js';
import { Card } from '@material-ui/core';


class DashboardLanding extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const self = this;
    }

    render(){
        return(
                <Grid container style={{height:'100%', padding:20}}>
                    <CustomersListCard
                        component={Grid}
                        item
                        xs={6}/>
                </Grid>
        )
    }
}

export default DashboardLanding;