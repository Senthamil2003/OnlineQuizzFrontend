import React from "react";
import "./Certificate.css";
import empty from "../../../Assets/imges/Emptyimage.png";
export default function CertificateEmpty() {
  return (
    <div className="certificate-empty-cont">
      <div className="cert-empty-image">
        <img src={empty} alt="" />
        <p>You need to pass to get Certificate</p>
      </div>
    </div>
  );
}
