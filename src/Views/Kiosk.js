import React, {Component} from 'react';
import QrReader from 'react-qr-reader';
import UIfx from 'uifx';
import successBeep from '../Media/success.mp3';
import Checkmark from '../Checkmark.js';
import axios from 'axios';

const beep = new UIfx(successBeep);

class Kiosc extends Component{
  constructor(props){
    super();
    this.videoReference = null;
    this.setVideoElementRef = element => {
      this.videoReference = element;
    }
    this.state = {
      qrResult:null,
      lastScanTimestamp:null,
    }
    this.onCodeScanned = this.onCodeScanned.bind(this);
    this.setRef = this.setRef.bind(this);
  }

  setRef(input){
    this.childRef = input;
    console.log(input);
  }

  componentDidMount(){
    const self = this;
    axios.get('/kiosk').then(function(response){
      const data = response.data;
      self.setState({establishmentName:data.establishment.name, establishmentMessage:data.establishment.message});
      console.log(self.state);
    })
  }
  
  onCodeScanned(code){
    var self = this;
    var token = localStorage.getItem('token');
    if(code && code != this.state.qrResult || (code && this.state.qrResult == code && this.state.lastScanTimestamp+(1000*30) <= new Date().getTime()) ){
      beep.play()
      axios.post('customer/entry', {
        number:code
      }).then(function(response){
        const data = response.data;
        self.setState({qrResult:code, lastScanTimestamp:new Date().getTime(), scanned:true, scanType:data.type});
      }).catch(function(error){
        console.log(error);
      });
    }
  }

  render(){
    const self = this;
    let header = (<h2>Test</h2>);
    if(this.state.qrResult){
      header = <h2>{this.state.qrResult}</h2>
    }

    return (
      <div className="App">
        <header className="App-header">
        <h1>Welcome to {this.state.establishmentName ? this.state.establishmentName : ''}</h1>
          {!this.state.scanned ? (
            <div>
              <p>{this.state.establishmentMessage ? this.state.establishmentMessage : ''}</p>
              <QrReader
                delay={50}
                onError={function(error){
                }}
                onScan={this.onCodeScanned}
                style={{
                  width:300,
                  margin:'0px auto'
                }}
                resolution={600}/>
            </div>
            ) : (
            <div>
              {this.state.scanType == 'entry' ? (
                <p>Thanks for your cooperation. Enjoy your stay!</p>
              ) : (
                <p>Thanks for your custom. Enjoy your day!</p>
              )}
              <Checkmark onAnimationComplete={function(){
                setTimeout(function(){
                  self.setState({scanned:false})
                }, 2000)}
              }/>
            </div>
          )}
        </header>
        {header}
      </div>
    );
  }
}

export default Kiosc;
