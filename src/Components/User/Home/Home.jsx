import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import NavigationBar from "../Navbar/NavComponent";
import prof from "../../../Assets/imges/professional.png";
import { Link } from "react-router-dom";
import Popular from "./Popular";

const Home = () => {
  
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className="outer-cont">
        <div className="home row">
          <div className="home-left col">
            <div className="home-txt">
              <p className="home-text">
                Get the <br />
                best <span>Certifications</span> <br />
                Approved <br />
                by <span>Companies</span>
              </p>
              <div className="home-stats">
                <div className="stats-left">
                  <p>100+</p>
                  <p>Certifications</p>
                </div>
                <div className="vl"></div>
                <div className="stats-right">
                  <p>1000+</p>
                  <p>Users</p>
                </div>
              </div>
              <div className="home-search">
                <Link to="/alltest">
                  <button className="btn home-view">
                    Visit Challenges -&gt;
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="home-right col">
            <div className="img-cont">
              <img src={prof} alt="Doctor" />
            </div>
          </div>
        </div>
        <div className="popular-test" id="best-seller">
          <p className="best-test">Popular Tests</p>
          <Popular />
        </div>
      </div>
    </div>
  );
};

export default Home;
