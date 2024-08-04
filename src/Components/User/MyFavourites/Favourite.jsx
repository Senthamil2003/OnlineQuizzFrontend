import React, { useState, useEffect } from "react";
import NavigationBar from "../Navbar/NavComponent";
import "./Favourite.css";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";
import sample from "../../../Assets/imges/angular.png";
import { Container, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import TestCard from "../AllTest/TestCard";
import EmptyFavourite from "./EmptyFavourite";
import Loader from "../Loader/Loader";

export default function Favourite() {
  const [data, setData] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    try {
      setPageLoad(true);
      const response = await axiosInstance.get(`api/User/GetMyFavourites`);
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

  const filterData = () => {
    let result = data || [];
    if (searchTerm !== "") {
      result = result.filter((item) =>
        item.testName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  };

  const handleLikeToggle = async (testId, currentLikedState) => {
    const userId = 1;
    try {
      if (currentLikedState) {
        await axiosInstance.put(
          `api/User/RemoveFromFavourite?FavouriteId=${
            data.find((item) => item.testId === testId).favouriteId
          }`
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
      }

      setData((prevData) => prevData.filter((item) => item.testId !== testId));
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };
  if (pageLoad) {
    return <Loader />;
  } else if (data)
    return (
      <div>
        <NavigationBar />
        <ToastContainer />

        <div className="history-cont">
          <p className="history-head">My Favourites</p>

          <div className="history-controler">
            <div className="history-btn-cont">
              <button className="btn history-action-btn">Filter</button>
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
          <div className="row">
            <Container>
              <div className="row" style={{ width: "100%", marginTop: "1.5%" }}>
                {filterData(data).map((item) => (
                  <TestCard
                    key={item.testId}
                    imageUrl={item.imageUrl}
                    cardData={item}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div>
        <NavigationBar />
        <EmptyFavourite />
      </div>
    );
  }
}
