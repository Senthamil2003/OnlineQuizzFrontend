import React from "react";
import { Spinner } from "react-bootstrap";
import NavigationBar from "../Navbar/NavComponent";

export default function Loader() {
  return (
    <div className="spinner-tot-div">
      <NavigationBar />
      <div className="spinner-div">
        <Spinner animation="grow" variant="dark" className="custom-spinner" />
      </div>
    </div>
  );
}
