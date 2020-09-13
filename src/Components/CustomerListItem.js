import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

class CustomerListItem extends Component{
    constructor(props){
        super(props);
        this.state = {}
        this.getTimeString = this.getTimeString.bind(this);
        this.onMoreButtonPressed = this.onMoreButtonPressed.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
    }

    getTimeString(date){
        const itemDate = new Date(Date.parse(date));
        return itemDate.getHours() + ":" + itemDate.getMinutes();
    }

    onMoreButtonPressed(event){
        this.props.onItemMoreButtonPressed(event, this.props.item.id);
    }

    handlePopupClose(event){
        this.props.onItemMoreButtonClosed(event);
    }

    render(){
        return(
            <ListItem style={{paddingLeft:12, paddingRight:6}}>
                <Grid container>
                    <ButtonBase component={Grid} item style={{justifyContent:'left'}} sx={12}>
                        <Typography 
                            style={{cursor:'pointer', fontSize:16}} 
                            onClick={this.props.onNumberClicked}>
                                {this.props.item.phoneNumber}
                            </Typography>
                    </ButtonBase>
                    <Grid container direction="row" item xs={12}>
                        <Grid container direction="column" item xs={9}>
                            <Grid item>
                                <Typography variant='h7' style={{color:'grey', fontSize:14}}>
                                    {new Date(Date.parse(this.props.item.entryTimestamp)).toISOString().split('T')[0]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='h7' style={{color:'grey', fontSize:14}}>
                                    {this.getTimeString(this.props.item.entryTimestamp)} 
                                </Typography>
                                -
                                <Typography 
                                    variant='h7' 
                                    style={{color:'grey', fontSize:14, cursor:(this.props.item.departureTimestamp ? 'default' : 'pointer')}}
                                    onClick={()=>{
                                        if(this.props.item.departureTimestamp == null)
                                            this.props.editDepartureTime(this.props.item.id)
                                    }}> 
                                    {(this.props.item.departureTimestamp ? (this.getTimeString(this.props.item.departureTimestamp)) : "N/A")}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton size="small" color="grey" aria-label="Edit" onClick={this.onMoreButtonPressed}>
                                <MoreVertIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItem>
        )
    }
}

export default CustomerListItem;
