import React from "react";
import wait from "../../../Assets/imges/wait time.png";
import { Link } from "react-router-dom";
export default function Wait({ time }) {
  function convertToNormalTime(isoString) {
    const date = new Date(isoString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",

      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }
  return (
    <div className="test-wait-cont">
      <div className="test-wait-box">
        <img className="wait-image" src={wait}></img>
        <div className="wait-txt-cont">
          <p>Test Already Taken</p>
          <p>
            You need to wait till <b>{convertToNormalTime(time)}</b>
          </p>
          <Link to="/alltest">
            <button className="btn test-wait">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
