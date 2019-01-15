import React, { Component } from 'react';
import "./Metronome.css";
import click1 from './assets/click1.wav';
import click2 from './assets/click2.wav';

class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4
    }

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
    
    this.handleBpmChange = this.handleBpmChange.bind(this);
    this.startStop = this.startStop.bind(this);
    this.playClick = this.playClick.bind(this);
  }

  handleBpmChange(event) {
    const bpm = event.target.value;
    if(this.state.playing) {
      //stop the old bpm and start a new one
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60/bpm) * 1000);
      this.setState({
        count: 0,
        bpm
      });
    } else {
        this.setState({ bpm })
      }
    }

  playClick() {
    const { count , beatsPerMeasure } = this.state;
    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }
    this.setState({
      count: (this.state.count + 1) % this.state.beatsPerMeasure
    })
  }

  startStop() {
    //test code: this.click1.play();
    if(this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false
      });
    } else {
      this.timer = setInterval(
        this.playClick, (60/this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        playing: true,
      }, this.playClick);
    }
  };

  render() {
    const {playing, bpm} = this.state;

    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>{bpm} BPM </div>
          <input 
            type="range" 
            min="40" 
            max="240" 
            value={bpm}
            onChange={this.handleBpmChange} />
        </div>
        <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
        
      </div>
    );
  }
}

export default Metronome;
