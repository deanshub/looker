import React, { Component } from 'react'
import classnames from 'classnames'
import NoSleep from 'nosleep.js'
import style from './SleepModeButton.module.css'

const noSleep = new NoSleep()

export default class SleepModeButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      sleepMode: false,
    }
  }

  toggleSleepMode(e) {
    e.stopPropagation()
    const sleepMode = !this.state.sleepMode
    if (sleepMode) {
      noSleep.enable()
    } else {
      noSleep.disable()
    }

    this.setState({
      sleepMode,
    })
  }

  render() {
    const {sleepMode} = this.state

    return (
      <button
        onClick={this.toggleSleepMode.bind(this)}
        className={classnames(style.sleepButton, {[style.on]:sleepMode, [style.off]:!sleepMode})}
      >
        Sleep Mode
      </button>
    )
  }
}
