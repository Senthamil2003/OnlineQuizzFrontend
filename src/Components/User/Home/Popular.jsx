import React, { useState, useEffect } from "react";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";
import "../AllTest/Alltest.css";
import sample from "../../../Assets/imges/angular.png";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import TestCard from "../AllTest/TestCard";
import Loader from "../Loader/Loader";

export default function Popular() {
  const [data, setData] = useState([]);
  const [pageLoad, setPageLoad] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchHistory = async () => {
    try {
      setPageLoad(true);
      const response = await axiosInstance.get(`api/User/GetPopularTests`);
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
  } else if (data)
    return (
      <div>
        <ToastContainer />

        <div className="history-cont">
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
}
