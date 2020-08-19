import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import QrReader from 'react-qr-reader';
import UIfx from 'uifx';
import successBeep from './success.mp3';

const beep = new UIfx(successBeep);

class App extends Component{
  constructor(props){
    super();
    this.videoReference = null;
    this.setVideoElementRef = element => {
      this.videoReference = element;
    }
    this.state = {
      qrResult:null
    }

    this.onCodeScanned = this.onCodeScanned.bind(this);
  }

  componentDidMount(){

  }
  
  onCodeScanned(code){
    if(code && code != this.state.qrResult){
      beep.play()
      fetch('http://localhost:4000/customer/entry', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({number:code})
      })
      this.setState({qrResult:code});
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
          <h1>Welcome to The Establishments Arms</h1>
          <p>Help us aid the track and trace effort by showing this kiosc the barcode provided by the Traci app</p>
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
        </header>
        {header}
      </div>
    );
  }
}

export default App;
