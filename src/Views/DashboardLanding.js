import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class DashboardLanding extends Component{
    constructor(props){
        super(props);
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
                        </CardContent>
                    </Card>
                </Grid>
        )
    }
}

export default DashboardLanding;