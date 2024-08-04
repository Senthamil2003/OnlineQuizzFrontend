import React from "react";
import { Link } from "react-router-dom";

const TestCardData = ({ imageUrl, cardData, onLikeToggle }) => {
  const handleClick = () => {
    onLikeToggle(cardData.testId, cardData.isFavourite);
  };

  return (
    <div className="col-lg-6">
      <div className="card dark" key={cardData.testId}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt={cardData.testName || "test Image"}
        />
        <div className="card-body">
          <div className="text-section">
            <div className="alltest-card-head">
              <h5 className="card-title fw-bold">{cardData.testName}</h5>
              <div className="svg-incomplete-cont">
                {cardData.isPassed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="green"
                    className="bi bi-check2-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>
                ) : cardData.isAttend ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="rgb(190, 131, 21)"
                    className="bi bi-circle-half"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                  </svg>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <hr />
            <p className="card-text">{cardData.description}</p>
            <div className="test-stats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#6048a1"
                className="bi bi-stopwatch"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5z" />
                <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64l.012-.013.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5M8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3" />
              </svg>
              <p> {cardData.duration} mins</p>
            </div>
            <div className="test-stats">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#6048a1"
                className="bi bi-speedometer2"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                <path
                  fillRule="evenodd"
                  d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"
                />
              </svg>
              <p className={cardData.testDifficult}> {cardData.testDifficult}</p>
            </div>

            <p className="card-text"></p>
            <div className="card-foot">
              <button
                className={`button button-like ${
                  cardData.isFavourite ? "liked" : ""
                }`}
                onClick={handleClick}
              >
                <i className="fa fa-heart"></i>
                <span>{cardData.isFavourite ? "Liked" : "Like"}</span>
              </button>

              <button
                className="view-btn btn"
                value={cardData.testId}
                disabled={!cardData.isActive}
              >
                {cardData.isWait ? "Waiting Time" : "Start Test"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCardData;
