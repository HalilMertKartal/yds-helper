import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { TIMER_LIMIT } from "../constants";
import './GeneralStyling.css';

const timerProps = {
    isPlaying: true,
    size: 150,
    strokeWidth: 10
  };


const renderTime = (dimension, time) => {

    return (
      <div className="time-wrapper">
        <div style={{fontSize:"40px"}}
        className="time">{time}</div>
      </div>
    );
  };

class Timer extends React.Component{

    getTimeSeconds = (time) => (TIMER_LIMIT - time) | 0;

    isComplete = this.props.isComplete;
    
    render(){
        return(
            <div className="timer">
                <CountdownCircleTimer
                    {...timerProps}
                    colors="#F6B28E"
                    duration={TIMER_LIMIT}
                    initialRemainingTime={TIMER_LIMIT}
                    isPlaying={this.props.isTimerPlaying}
                    key={this.props.shouldRepeat}
                    onComplete={() => this.isComplete(true)}
                >
                    {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime("seconds", this.getTimeSeconds(elapsedTime))}
                    </span>
                    )}
                </CountdownCircleTimer>
            </div>
        );
    }
}

export default Timer;