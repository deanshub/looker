import React, { Component } from 'react'
import Webcam from "react-webcam"
import style from './App.module.css'
import SleepModeButton from './SleepModeButton'
import PersonFound from './PersonFound'
import Online from './Online'
import ReconnectingWebSocket from 'reconnecting-websocket'


function initWs(messageFn = console.log, wsUrl= `ws://${window.location.host}/api/detect`, openFn, closeFn, errFn = console.error) {
  // const ws = new ReconnectingWebSocket(wsUrl, [], options)
  console.log(wsUrl);
  const ws = new ReconnectingWebSocket(wsUrl, null, {})
  // ws.binaryType = 'arraybuffer'

  ws.addEventListener('error', (err) => {
    errFn(err);
  })
  ws.addEventListener('open', () => {
    openFn()
  })
  ws.addEventListener('close', () => {
    // console.log('closed');
    // ws._connect()
    closeFn()
  })
  ws.addEventListener('message', (res) => {
    const message = JSON.parse(res.data)
    if (messageFn) {
      messageFn(message)
    }
  })
  return ws
}

// start a websocket (with reconnection)
// add an icon for the connection status (online\ offline)
// send current image over ws every few seconds
// if ws states that a person is found then change the value accordingly

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      onlineStatus: false,
      personExists: false,
    }
  }

  componentDidMount(){
    initWs(console.log, undefined, ()=>{
      this.setState({
        onlineStatus: true,
      })
    }, ()=>{
      this.setState({
        onlineStatus: false,
      })
    }, console.error)
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc);
    // send image to an api which will save it to disk
  };

  render() {
    const {onlineStatus, personExists} = this.state

    return (
      <div onClick={this.capture.bind(this)}>
        <Webcam
          className={style.video}
          audio={false}
          screenshotFormat="image/png"
          ref={this.setRef.bind(this)}
        />
        <SleepModeButton/>
        <PersonFound value={personExists}/>
        <Online status={onlineStatus}/>
      </div>
    );
  }
}

export default App;
