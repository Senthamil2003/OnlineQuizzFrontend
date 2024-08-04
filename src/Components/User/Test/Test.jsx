import React, { useEffect, useState, useRef } from "react";
import "./Test.css";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Timer from "./Timer";
import Form from "react-bootstrap/Form";

import TestResult from "./TestResult";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";
import Loader from "../Loader/Loader";
import TestNavbar from "./TestNavbar";

export default function Test() {
  const location = useLocation();
  const [expiryTime, setExpiryTime] = useState();
  const [answers, setAnswers] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [duration, setDuration] = useState();
  const [testName, setTestName] = useState();
  const [result, setResult] = useState();
  const [ct, setCt] = useState(0);
  const markedCt = useRef();
  const answererCt = useRef();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const intervalId = useRef();

  const submissionTest = useRef();
  var submissionId;

  const answersRef = useRef(answers);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  function calculateRemainingSeconds(givenDateString) {
    const givenDate = new Date(givenDateString);
    const currentDate = new Date();
    const differenceInMillis = givenDate - currentDate;
    const remainingSeconds = Math.floor(differenceInMillis / 1000);
    return remainingSeconds;
  }

  const fetchdata = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      submissionId = queryParams.get("submissionid");
      console.log(submissionId);
      const response = await axiosInstance.get(
        `api/Test/ResumeTest?SubmissionId=${submissionId}`
      );
      console.log("Data:", response.data);
      submissionTest.current = response.data.submissionId;
      setDuration(response.data.testDuration);
      setIsFinish(response.data.isSubmited);
      setExpiryTime(calculateRemainingSeconds(response.data.testEndTime));
      setTestName(response.data.testName);

      setAnswers(
        response.data.testQuestion.map((item) => ({
          answer: item.selectedAnswer == null ? "" : item.selectedAnswer,
          flagged: item.isFlagged,
          answerId: item.submissionAnswerId,
          questionId: item.questionId,
          isChanged: false,
          question: item.questionDescription,
          options: item.options,
          questionType: item.questionType,
        }))
      );
      return response.data.isSubmited;
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };
  console.log(answers);

  const handleShow1 = () => {
    setShow1(true);
    let markedct = 0;
    let answeredct = 0;
    answers.map((item) => {
      if (item.answer !== "") {
        answeredct += 1;
      }
      if (item.flagged) {
        markedct += 1;
      }
    });
    answererCt.current = answeredct;
    markedCt.current = markedct;
    console.log(answererCt, markedCt);
  };

  const handleShow2 = () => {
    setShow2(true);
    let markedct = 0;
    let answeredct = 0;
    answers.map((item) => {
      if (item.answer !== "") {
        answeredct += 1;
      }
      if (item.flagged) {
        markedct += 1;
      }
    });
    answererCt.current = answeredct;
    markedCt.current = markedct;
    console.log(answererCt, markedCt);
  };

  useEffect(() => {
    const initializeTest = async () => {
      const queryParams = new URLSearchParams(location.search);
      submissionId = queryParams.get("submissionId");
      const isSubmitted = await fetchdata();
      if (isSubmitted) {
        await Submit();
      } else {
        intervalId.current = setInterval(async () => {
          await synchronizeDb();
        }, 15000);
      }
    };

    initializeTest();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  let Previous = () => {
    if (ct !== 0) setCt((pre) => pre - 1);
  };

  let Next = () => {
    if (ct !== answers.length - 1) setCt((pre) => pre + 1);
  };

  let DotNavigate = (value) => {
    setCt(value);
  };

  let Flag = () => {
    setAnswers((prev) =>
      prev.map((item, index) =>
        index === ct
          ? { ...item, flagged: !item.flagged, isChanged: true }
          : item
      )
    );
  };

  const handle = (value) => {
    setAnswers((prev) =>
      prev.map((item, index) =>
        index === ct
          ? {
              ...item,
              answer: value,
              isChanged: true,
              selectedAnswer: value,
            }
          : item
      )
    );
  };
  async function synchronizeDb() {
    try {
      // Create a local copy of the current answers to avoid race conditions
      const currentAnswers = [...answersRef.current];

      const changedAnswers = currentAnswers
        .filter((answer) => answer.isChanged)
        .map((answer) => ({
          answerId: answer.answerId,
          answerName: answer.selectedAnswer,
          isFlaged: answer.flagged,
        }));

      console.log("Changed answers:", changedAnswers);

      if (changedAnswers.length > 0) {
        const response = await axiosInstance.post(
          `api/Test/SynchronizeTestData`,
          changedAnswers
        );

        // Use functional update to ensure we're working with the latest state
        setAnswers((prevAnswers) =>
          prevAnswers.map((answer) => {
            const changedAnswer = changedAnswers.find(
              (changed) => changed.answerId === answer.answerId
            );
            if (changedAnswer) {
              // Only mark as unchanged if the synchronized value matches the current selectedAnswer
              return {
                ...answer,
                isChanged: changedAnswer.answerName !== answer.selectedAnswer,
              };
            }
            return answer;
          })
        );

        console.log("Synchronization successful:", response.data);
      } else {
        console.log("No changes to synchronize");
      }
    } catch (error) {
      console.error("Error synchronizing data:", error);
      // Consider adding user-facing error handling here
    }
  }

  const Submit = async () => {
    if (!isFinish) {
      await synchronizeDb();
    }

    try {
      var submission = {
        submissionId: submissionTest.current,
        finishTime: new Date().toISOString(),
      };
      console.log(submission);

      const response = await axiosInstance.post(
        `api/Test/SubmitTest`,
        submission
      );
      setResult(response.data);
      setIsFinish(true);
      if (intervalId) {
        clearInterval(intervalId);
      }
      console.log("Submission successful:", response.data);
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  if (isFinish) {
    if (result)
      return (
        <div>
          <div>
            <TestResult
              testName={result.testName}
              totalScore={result.totalScore}
              obtainedScore={result.obtainedScore}
              maxScore={result.maxObtainedScore}
              isPassed={result.isPassed}
              timeTaken={result.totalTimeTaken}
              testId={result.testId}
            />
          </div>
        </div>
      );
  } else if (
    !isFinish &&
    answers.length &&
    expiryTime &&
    duration &&
    testName
  ) {
    return (
      <div>
        <TestNavbar
          testName={testName}
          expiryTime={expiryTime}
          duration={duration}
        />
        <div className="mobile-test-bar">
          <Button
            className="test-submit-mobile summary-btn"
            onClick={handleShow1}
          >
            Summary
          </Button>
          <Button
            className="test-submit-mobile"
            variant="danger"
            onClick={handleShow2}
          >
            Submit
          </Button>
        </div>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Test Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Answered Questions: {answererCt.current}</p>
            <p>Marked Questions: {markedCt.current}</p>
            <p>Unanswered Questions: {answers.length - answererCt.current}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title>Check before you submit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Answered Questions: {answererCt.current}</p>
            <p>Marked Questions: {markedCt.current}</p>
            <p>Unanswered Questions: {answers.length - answererCt.current}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="danger" onClick={Submit}>
              Submit Test
            </Button>
          </Modal.Footer>
        </Modal>

        <Container fluid className="custom-test-container">
          <Row>
            <Col lg={9} className="test-question-cont">
              <div className="test-cont">
                <div className="question-answer-container">
                  <div className="question">{answers[ct].question}</div>
                  <div className="answer">
                    {answers[ct].questionType !== "Fillups" ? (
                      answers[ct].options.map((item, i) => (
                        <div
                          key={i}
                          onClick={() => handle(item.optionName.trim())}
                          className={
                            answers[ct].answer === item.optionName.trim()
                              ? "option select-option"
                              : "option"
                          }
                        >
                          {item.optionName.trim()}
                        </div>
                      ))
                    ) : (
                      <Form.Control
                        type="text"
                        value={
                          answers[ct].answer !== null ? answers[ct].answer : ""
                        }
                        className="fillup-box"
                        onChange={(e) => handle(e.target.value)}
                        placeholder="Type your answer here"
                      />
                    )}
                  </div>
                </div>
                <div className="question-action">
                  <button className="btn test-action-btn" onClick={Previous}>
                    Previous
                  </button>
                  <button className="btn test-action-btn" onClick={Flag}>
                    {answers[ct].flagged ? "Unflag" : "Flag"}
                  </button>
                  <button
                    className="btn test-action-btn"
                    onClick={Next}
                    disabled={ct === answers.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </Col>
            <Col lg={3} className="test-menu-cont">
              <div className={`test-menu`}>
                <Timer
                  time={expiryTime}
                  totalTime={duration}
                  submitFunction={Submit}
                />
                <Container fluid>
                  <div className="question-dot">
                    <Row>
                      {answers.map((item, i) => (
                        <Col
                          key={i}
                          className="dot-cont"
                          onClick={() => DotNavigate(i)}
                          lg={3}
                          md={4}
                          sm={4}
                        >
                          <div
                            className={`dot
                              ${item.flagged ? "marked-dot" : ""}
                              ${item.answer !== "" ? "answered-dot" : ""}
                              ${ct === i ? "current-dot" : ""}
                            `}
                          >
                            {i + 1}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Container>
                <div className="test-actions">
                  <Button
                    className="test-submit summary-btn"
                    variant="secondary"
                    onClick={handleShow1}
                  >
                    Summary
                  </Button>
                  <Button
                    className="test-submit"
                    variant="danger"
                    onClick={handleShow2}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else return <Loader />;
}
