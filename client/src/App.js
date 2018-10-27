import React, { Component } from 'react'
import Webcam from "react-webcam"
import style from './App.module.css'
import SleepModeButton from './SleepModeButton'
import PersonFound from './PersonFound'
import Online from './Online'

// start a websocket (with reconnection)
// add an icon for the connection status (online\ offline)
// send current image over ws every few seconds
// if ws states that a person is found then change the value accordingly

class App extends Component {
  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    // send image to an api which will save it to disk
  };

  render() {
    return (
      <div onClick={this.capture.bind(this)}>
        <Webcam
          className={style.video}
          audio={false}
          screenshotFormat="image/png"
          ref={this.setRef.bind(this)}
        />
        <SleepModeButton/>
        <PersonFound value/>
        <Online status={false}/>
      </div>
    );
  }
}

export default App;
