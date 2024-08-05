import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";
import { useLocation } from "react-router-dom";
import Certificate from "../Certificate/Certificate";

import NavigationBar from "../Navbar/NavComponent";
import CertificateEmpty from "../Certificate/CertificateEmpty";

export default function Leaderboard() {
  const location = useLocation();
  const [statsData, setStatsData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [submissionData, setSubmissionData] = useState([]);
  const [certificateData, setCertificateData] = useState();
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchStatsData();
    fetchLeaderboardData();
  }, []);

  const fetchStatsData = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const testId = queryParams.get("testid");

      const response = await axiosInstance.get(
        `api/Test/GetStats?TestId=${testId}`
      );
      console.log(response.data);
      setStatsData(response.data);
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };
  const fetchCertificate = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const testId = queryParams.get("testid");

      const response = await axiosInstance.get(
        `api/Test/GetTestCertificate?TestId=${testId}`
      );
      setCertificateData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const fetchLeaderboardData = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const testId = queryParams.get("testid");
      const response = await axiosInstance.get(
        `api/Test/GetLeaderboard?TestId=${testId}`
      );
      console.log(response.data);
      setLeaderboardData(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const fetchSubmissionData = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const testId = queryParams.get("testid");

      const response = await axiosInstance.get(
        `api/Test/GetSubmissions?TestId=${testId}`
      );
      setSubmissionData(response.data);
    } catch (error) {
      console.error("Error fetching submission data:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "submission" && submissionData.length === 0) {
      fetchSubmissionData();
    }
    if (tab == "certificate" && !certificateData) {
      fetchCertificate();
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData =
    activeTab === "leaderboard"
      ? leaderboardData.filter((item) =>
          item.userName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : submissionData.filter((item) =>
          item.submissionId.toString().includes(searchTerm)
        );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className="main-leaderboard">
      <NavigationBar />
      <br />
      <div>
        <div className="stats row">
          <div className="col col-lg-4">
            <div className="stats-item">
              <div className="ststs-props">
                <div className="svg-cont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    fill="currentColor"
                    className="bi bi-bar-chart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                  </svg>
                </div>
                <div className="txt-cont">
                  <p className="stats-count" id="customerCount">
                    {statsData
                      ? `${statsData.myRank}/${statsData.passCount}`
                      : "-"}
                  </p>
                  <p className="stats-text">Rank</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4">
            <div className="stats-item">
              <div className="ststs-props">
                <div className="svg-cont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-bookmark-plus-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5m6.5-11a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5z"
                    />
                  </svg>
                </div>
                <div className="txt-cont">
                  <p className="stats-count" id="purchaseAmount">
                    {statsData
                      ? `${statsData.maxMark}/${statsData.totalMark}`
                      : "-"}
                  </p>
                  <p className="stats-text">Max Mark</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4">
            <div className="stats-item">
              <div className="ststs-props">
                <div className="svg-cont">
                  {statsData?.isPassed ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      fill="currentColor"
                      className="bi bi-emoji-sunglasses-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M2.31 5.243A1 1 0 0 1 3.28 4H6a1 1 0 0 1 1 1v.116A4.2 4.2 0 0 1 8 5c.35 0 .69.04 1 .116V5a1 1 0 0 1 1-1h2.72a1 1 0 0 1 .97 1.243l-.311 1.242A2 2 0 0 1 11.439 8H11a2 2 0 0 1-1.994-1.839A3 3 0 0 0 8 6c-.393 0-.74.064-1.006.161A2 2 0 0 1 5 8h-.438a2 2 0 0 1-1.94-1.515zM4.969 9.75A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .866-.5z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="33"
                      fill="currentColor"
                      class="bi bi-emoji-frown-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m-2.715 5.933a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 0 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8" />
                    </svg>
                  )}
                </div>
                <div className="txt-cont">
                  <p className="stats-count" id="ordersAmount">
                    {statsData ? (statsData.isPassed ? "Pass" : "Fail") : "-"}
                  </p>
                  <p className="stats-text">Test Status</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4">
            <div className="stats-item">
              <div className="ststs-props">
                <div className="svg-cont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    fill="currentColor"
                    className="bi bi-patch-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5"
                    />
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                  </svg>
                </div>
                <div className="txt-cont">
                  <p className="stats-count" id="ordersAmount">
                    {statsData ? statsData.testTakenCount : "-"}
                  </p>
                  <p className="stats-text">Attended Persons</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4">
            <div className="stats-item">
              <div className="ststs-props">
                <div className="svg-cont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    fill="currentColor"
                    className="bi bi-award-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864z" />
                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1z" />
                  </svg>
                </div>
                <div className="txt-cont">
                  <p className="stats-count" id="ordersAmount">
                    {statsData ? statsData.passCount : "-"}
                  </p>
                  <p className="stats-text">Pass Persons</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4">
            <div className="stats-item">
              <div className="ststs-props">
                <div className="svg-cont">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-percent"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.442 2.558a.625.625 0 0 1 0 .884l-10 10a.625.625 0 1 1-.884-.884l10-10a.625.625 0 0 1 .884 0M4.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m7 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m0 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                  </svg>
                </div>
                <div className="txt-cont">
                  <p className="stats-count" id="medicineCount">
                    {statsData
                      ? `${(
                          (statsData.passCount / statsData.testTakenCount) *
                          100
                        ).toFixed(2)}%`
                      : "-"}
                  </p>
                  <p className="stats-text">Pass Percentage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="table-cont">
        <div className="table-top">
          <div className="table-left">
            <button
              className={`leaderboard-btn ${
                activeTab === "leaderboard" ? "leader-active" : ""
              }`}
              onClick={() => handleTabChange("leaderboard")}
            >
              Leader Board
            </button>
            <button
              className={`leaderboard-btn ${
                activeTab === "submission" ? "leader-active" : ""
              }`}
              onClick={() => handleTabChange("submission")}
            >
              Submission
            </button>
            <button
              className={`leaderboard-btn ${
                activeTab === "certificate" ? "leader-active" : ""
              }`}
              onClick={() => handleTabChange("certificate")}
            >
              Certificate
            </button>
          </div>

          <div className="table-right">
            <div className="leader-search input-group">
              <input
                type="text"
                className="form-control"
                placeholder={
                  activeTab === "leaderboard"
                    ? "Search by username"
                    : "No Search"
                }
                value={searchTerm}
                onChange={handleSearch}
                disabled={activeTab == "leaderboard" ? false : true}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                id="button-addon1"
              >
                Search
              </button>
            </div>
            <div>
              <button
                type="button"
                className="filter"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  className="bi bi-funnel"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <hr />
        {activeTab == "certificate" && certificateData?.isPassed ? (
          <Certificate
            name={certificateData?.userName}
            course={certificateData?.certificateTestName}
            percentage={
              certificateData?.obtainedScore != 0
                ? (certificateData?.obtainedScore /
                    certificateData?.totalMark) *
                  100
                : 0
            }
            date={convertToNormalTime(certificateData.providedDate)}
          />
        ) : !certificateData?.isPassed && activeTab == "certificate" ? (
          <CertificateEmpty />
        ) : (
          <></>
        )}
        <table
          className={
            activeTab == "certificate"
              ? "table custom-table leader-table-hide"
              : "table custom-table"
          }
          style={{ borderRadius: "10px" }}
        >
          <thead>
            <tr>
              {activeTab === "leaderboard" ? (
                <>
                  <th scope="col">#Rank</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Obtained Score</th>
                  <th scope="col">Time Taken</th>
                  <th scope="col">Submitted Date</th>
                </>
              ) : (
                <>
                  <th scope="col">Submission ID</th>
                  <th scope="col">Obtained Score</th>
                  <th scope="col">Submission Date</th>
                  <th scope="col">Time Taken</th>
                  <th scope="col">Pass Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody id="purchase-report">
            {currentItems.map((item, index) => (
              <tr key={index}>
                {activeTab === "leaderboard" ? (
                  <>
                    <td>{item.rank}</td>
                    <td>{item.userName}</td>
                    <td>{item.maxObtainedMark}</td>
                    <td>{item.timeTaken.toFixed(2)} seconds</td>
                    <td>{convertToNormalTime(item.submissionTime)}</td>
                  </>
                ) : activeTab == "submission" ? (
                  <>
                    <td>{item.submissionId}</td>
                    <td>{item.obtainedScore}</td>
                    <td>{convertToNormalTime(item.submissionDate)}</td>
                    <td>{item.timeTaken.toFixed(2)} seconds</td>
                    <td>
                      {item.isPassed ? (
                        <div className="leader-submission">
                          <div className="leader-pass"> Pass</div>
                        </div>
                      ) : (
                        <div className="leader-submission ">
                          <div className="leader-fail"> Fail</div>
                        </div>
                      )}
                    </td>
                  </>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">
                <div className="table-footer">
                  <div className="pagination-info">
                    {indexOfFirstItem + 1}-
                    {Math.min(indexOfLastItem, filteredData.length)} of{" "}
                    {filteredData.length}
                  </div>
                  <div className="pagination">
                    <button
                      className="page-btn"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &laquo;
                    </button>
                    {Array.from(
                      { length: Math.ceil(filteredData.length / itemsPerPage) },
                      (_, i) => (
                        <button
                          key={i}
                          className={`page-btn ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      )
                    )}
                    <button
                      className="page-btn"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(filteredData.length / itemsPerPage)
                      }
                    >
                      &raquo;
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
