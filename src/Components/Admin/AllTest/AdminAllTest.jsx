import React, { useState, useEffect } from "react";

import "./AddTest.css";

import sample from "../../../Assets/imges/java.png";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";

import AddTestCard from "./AddTestCard";
import AdminNav from "../Navbar/AdminNav";

export default function AdminAllTest() {
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    try {
      const response = await axiosInstance.get(`api/Admin/GetAllTest`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filterData = () => {
    let result = data || [];
    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.testName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  };

  const handleLikeToggle = async (testId, currentStatus) => {
    try {
      await axiosInstance.put(`/api/Admin/UpdateVisibility?testId=${testId}`);
      toast.success(
        currentStatus
          ? "Test Dissabled Successful"
          : "Test Activation Successful",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        }
      );

      setData((prevData) =>
        prevData.map((item) =>
          item.testId === testId ? { ...item, isActive: !currentStatus } : item
        )
      );
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  if (data)
    return (
      <div>
        <AdminNav />
        <ToastContainer />

        <div className="history-cont">
          <p className="history-head">All Test</p>

          <div className="history-controler">
            <div className="history-btn-cont">
              <button className="btn history-action-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-funnel"
                  viewBox="0 0 16 16"
                >
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                </svg>
                Filter
              </button>
            </div>
            <div className="search input-group history-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search by test name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                id="button-addon1"
              >
                Search
              </button>
            </div>
          </div>
          <div className="test-cart-totcont">
            <div className="row" style={{ width: "100%", marginTop: "1.5%" }}>
              {filterData(data).map((item) => (
                <AddTestCard
                  key={item.testId}
                  imageUrl={item.imageUrl}
                  cardData={item}
                  onLikeToggle={handleLikeToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}
