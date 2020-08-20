import React, {Component} from 'react';
import './Checkmark.css';

class Checkmark extends Component{
    constructor(props){
        super();
        this.onAnimationComplete = function(){
            if(props.onAnimationComplete)
                props.onAnimationComplete();
        }
    }

    render(){
        return(
            <div class="success-checkmark" onAnimationEnd={()=>this.onAnimationComplete()}>
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            </div>
        );
    }
}

export default Checkmark;