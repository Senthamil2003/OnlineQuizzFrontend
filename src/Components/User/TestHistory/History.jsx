import React, { useState, useEffect } from "react";
import NavigationBar from "../Navbar/NavComponent";
import "./History.css";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";

import HistoryCard from "./HistoryCard";
import sample from "../../../Assets/imges/gk.png";
import Loader from "../Loader/Loader";

import { ToastContainer, toast } from "react-toastify";

export default function History() {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("complete");
  const [pageLoad, setPageLoad] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    try {
      setPageLoad(true);
      const response = await axiosInstance.get(`api/User/History`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    } finally {
      setPageLoad(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  const filterData = (data) => {
    let result = data.filter((item) =>
      activeTab === "complete" ? item.isPassed : !item.isPassed
    );
    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.testName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  };

  const handleLikeToggle = async (testId, currentLikedState, favouriteId) => {
    console.log(currentLikedState, testId);
    try {
      if (currentLikedState) {
        await axiosInstance.put(
          `api/User/RemoveFromFavourite?FavouriteId=${favouriteId}`
        );
        toast.success("Removed from wish list", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      } else {
        const response = await axiosInstance.post(
          `api/User/AddToFavourite?TestId=${testId}`
        );
        toast.success("Added to wish list", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setData((prevData) =>
          prevData.map((item) =>
            item.testId === testId
              ? { ...item, favouriteId: response.data.favouriteId }
              : item
          )
        );
      }

      setData((prevData) =>
        prevData.map((item) =>
          item.testId === testId
            ? { ...item, isFavourite: !currentLikedState }
            : item
        )
      );
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };
  if (pageLoad) {
    return <Loader />;
  }

  return (
    <div>
      <NavigationBar />
      <ToastContainer />

      <div className="history-cont">
        <p className="history-head">Test History</p>

        <div className="history-controler">
          <div className="history-btn-cont">
            <button
              className={`btn history-action-btn ${
                activeTab === "complete" ? "history-active" : ""
              }`}
              onClick={() => changeTab("complete")}
            >
              Completed
            </button>
            <button
              className={`btn history-action-btn ${
                activeTab === "pending" ? "history-active" : ""
              }`}
              onClick={() => changeTab("pending")}
            >
              Pending
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
              <HistoryCard
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
