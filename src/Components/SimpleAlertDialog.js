import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { MuiThemeProvider, DialogTitle } from '@material-ui/core';

class SimpleAlertDialog extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Dialog open={this.props.show}>
                <DialogContent>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogContent>{this.props.message}</DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose}>Ok</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default SimpleAlertDialog;