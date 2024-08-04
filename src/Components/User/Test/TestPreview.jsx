import React, { useEffect, useState } from "react";
import "./Preview.css";
import NavigationBar from "../Navbar/NavComponent";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import Wait from "./Wait";
import Loader from "../Loader/Loader";

export default function () {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState();
  const [isload, SetLoad] = useState(false);
  const fetchPreview = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const testId = queryParams.get("testid");
      SetLoad(true);
      const response = await axiosInstance.get(
        `api/Test/TestPreview?CertificateTestId=${testId}`
      );
      SetLoad(false);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      SetLoad(false);
      console.error("Error fetching leaderboard data:", error);
    } finally {
      SetLoad(false);
    }
  };
  async function StartTest() {
    try {
      const queryParams = new URLSearchParams(location.search);
      const testId = queryParams.get("testid");
     
      SetLoad(true);
      if (!data.isResume && !data.isPending) {
        const response = await axiosInstance.get(
          `api/Test/StartTest?CertificateTestId=${testId}`
        );
        navigate(`/test?submissionid=${response.data.submissionId}`)
        
        console.log(response.data);
      } else {
        navigate(`/test?submissionid=${data.submissionId}`)
      }
    } catch (e) {
      console.log(e);
    } finally {
      SetLoad(false);
    }
  }
  useEffect(() => {
    fetchPreview();
  }, []);
  if (isload) {
    return (
      <Loader/>
    );
  } else if (data && !data.isWait)
    return (
      <div className="test-preview-cont">
        <NavigationBar />
        <div className="preview-data-cont">
          <div className="row" style={{ width: "100%" }}>
            <div className="preview-left col-lg-6">
              <div className="instruction">
                <p className="instruction-head">Test Instructions</p>
                <ul>
                  <li>
                    The test contains Both Mcq and Fill in the blank questions.
                    Type in the answer box for Fill in the blanks question
                  </li>
                  <li>All questions are compulsory.</li>
                  <li>Try to submit the paper with in the given time.</li>
                  <li>
                    You are allowed to submit only once, make sure that you have
                    correctly attempted all the questions before submission.
                  </li>
                  <li>
                    Make sure you clicked on submit button to successfully
                    complete the test.
                  </li>
                </ul>
              </div>
            </div>
            <div className="preview-right col-lg-6">
              <p className="test-overview">{data.testName}</p>
              <div className="overview-strip"></div>
              <table className="table ">
                <thead>
                  <th>Total Questions</th>
                  <th>Total Mark</th>
                  <th>Pass Mark</th>
                  <th>Duration</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.totalQuestion}</td>
                    <td>{data.totalMark}</td>
                    <td>{data.passMark}</td>
                    <td>{data.duration} mins</td>
                  </tr>
                  <tr></tr>
                </tbody>
              </table>
              <div className="overview-strip"></div>
              <button className="btn test-start-btn" onClick={StartTest}>
                {data.isResume ? "Resume Test" : data.isPending ? "Click to View Result" : "Start Test"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  else if (data?.isWait) {
    return (
      <div>
        <NavigationBar />
        <Wait time={data.nextTestTime} />
      </div>
    );
  }
}
