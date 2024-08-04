import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Timer.css";

export default function Timer({ time, totalTime, submitFunction }) {
  console.log(totalTime,time)
  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={Number(totalTime * 60)}
        initialRemainingTime={Number(time)}
        colors={["#6249a7", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => submitFunction()}
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}
const renderTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="timer-text">Remaining</div>
      <div className="timer-value">{`${minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`}</div>
      <div className="timer-text">minutes</div>
    </div>
  );
};
