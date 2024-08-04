import React from "react";
import "./Result.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Link } from "react-router-dom";
import NavigationBar from "../Navbar/NavComponent";

export default function TestResult({
  testName,
  totalScore,
  obtainedScore,
  maxScore,
  isPassed,
  timeTaken,
  testId,
}) {
  let percentage = Math.round((obtainedScore / totalScore) * 100);
  function secondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toFixed(0)}`;
  }

  return (
    <div>
      <NavigationBar />
      <div className="test-result-tot-cont">
        <div className="result-card">
          <p className="result-head">{testName} Result</p>
          <div className="score-percentage-cont">
            <div className="score-percentage">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: "butt",
                  textSize: "20px",
                  pathTransitionDuration: 0.5,
                  pathColor: `#6249a7`,
                  textColor: "#6249a7",
                  trailColor: "#d6d6d6",
                  backgroundColor: "#6249a7",
                })}
              />
            </div>
          </div>

          <div className="checkout-cont">
            <div className="row">
              <div className="col-6 test-result-text">Time Taken</div>
              <div className="col-6 test-result-text" id="delivery-charge">
                {secondsToMinutes(timeTaken)}
              </div>
            </div>
            <div className="row">
              <div className="col-6 test-result-text">Status</div>
              <div className="col-6 test-result-text" id="discount">
                {isPassed ? "Pass" : "Fail"}
              </div>
            </div>
            <div className="row">
              <div className="col-6 test-result-text">Total Score</div>
              <div className="col-6 test-result-text" id="delivery-charge">
                {totalScore}
              </div>
            </div>
            <div className="row">
              <div className="col-6 test-result-text">Obtained Score</div>
              <div className="col-6 test-result-text" id="delivery-charge">
                {obtainedScore}
              </div>
            </div>
            <div className="row">
              <div className="col-6 test-result-text">Highest Score</div>
              <div className="col-6 test-result-text" id="delivery-charge">
                {maxScore}
              </div>
            </div>

            {/* <div className="row">
            <div className="col-6 test-result-text">Attempt Number</div>
            <div className="col-6 test-result-text" id="total-amount">
              {attemptNumber}
            </div>
          </div> */}

            <div className="row">
              <div className="col button-cont">
                <Link to={`/leaderboard?testid=${testId}`}>
                  <button className="checkout-button btn" id="checkout-btn">
                    View Test Stats
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
