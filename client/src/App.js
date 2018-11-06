import React, { Component } from 'react'
import Webcam from 'react-webcam'
import axios from 'axios'
import style from './App.module.css'
import SleepModeButton from './SleepModeButton'
import PersonFound from './PersonFound'
import Online from './Online'
import ReconnectingWebSocket from 'reconnecting-websocket'
// import clientDetector from './detectors/coco'

function initWs(messageFn = console.log, wsUrl= `wss://${window.location.host}/api/detect`, openFn, closeFn, errFn = console.error) {
  // const ws = new ReconnectingWebSocket(wsUrl, [], options)
  const ws = new ReconnectingWebSocket(wsUrl, null, {})
  // ws.binaryType = 'arraybuffer'

  ws.addEventListener('error', (err) => {
    errFn(err);
  })
  ws.addEventListener('open', () => {
    openFn()
  })
  ws.addEventListener('close', () => {
    closeFn()
  })
  ws.addEventListener('message', (res) => {
    if (messageFn) {
      messageFn(res.data)
    }
  })
  return ws
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      onlineStatus: false,
      personExists: false,
    }
    this.sendImageToServer = this.sendImageToServer.bind(this)
  }

  componentDidMount(){
    //TODO: if ws states that a person is found then change the value accordingly
    this.ws = initWs((exists)=>{
      this.setState({
        personExists: exists!=='0',
      })
    }, undefined, ()=>{
      this.setState({
        onlineStatus: true,
      })
    }, ()=>{
      this.setState({
        onlineStatus: false,
        personExists: false,
      })
    }, console.error)

    // this.detect()
  }

  setRef(webcam) {
    this.webcam = webcam;
  }

  capture() {
    const image = this.webcam.getScreenshot()
    axios.post('/api/capture', {image}).catch(console.error)
  }

  sendImageToServer() {
    const imageSrc = this.webcam.getScreenshot()
    this.ws.send(imageSrc)
    setTimeout(this.sendImageToServer, 500)
  }

  // async detect() {
  //   setTimeout(async()=>{
  //     // console.log(this.webcam.canvas);
  //     const predictions = await clientDetector(this.webcam.canvas)
  //     console.log(predictions);
  //   },2000)
  // }

  render() {
    const {onlineStatus, personExists} = this.state

    return (
      <div onClick={this.capture.bind(this)}>
        <Webcam
          className={style.video}
          audio={false}
          screenshotFormat="image/png"
          screenshotQuality={1}
          onUserMedia={this.sendImageToServer}
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
