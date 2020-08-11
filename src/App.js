import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam';

import QrScanner from 'qr-scanner';
import WorkerPath from '!!file-loader!../../node_modules/qr-scanner/qr-scanner-worker.min.js';
QrScanner.WORKER_PATH = WorkerPath;
console.log(QrScanner.WORKER_PATH);
class App extends Component{
  constructor(props){
    super();
    this.videoReference = null;
    this.setVideoElementRef = element => {
      this.videoReference = element;
    }
  }

  componentDidMount(){
    const video = this.videoReference.video;
    console.log(this.videoReference);
    const scanner = new QrScanner(video, function(result){
      console.log(result);
    })

  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to The Establishments Arms</h1>
          <p>Help us aid the track and trace effort by showing this kiosc the barcode provided by the Traci app</p>
          <Webcam width={320} height={240} style={{borderRadius:4}} ref={this.setVideoElementRef}/>
        </header>
      </div>
    );
  }
}

export default App;
