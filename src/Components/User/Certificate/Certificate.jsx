import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Certificate.css";
import badge from "../../../Assets/imges/badge.jpg"

const Certificate = ({ name, course, percentage, date }) => {
  const downloadCertificate = () => {
    const input = document.getElementById("certificate");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`${name}_certificate.pdf`);
    });
  };

  return (
    <div className="certificate-container">
      <div id="certificate" className="certificate">
        <div className="certificate-header">
          <div className="logo">
              <img src={badge} alt="badge" />
          </div>
          <h1>Certificate of Achievement</h1>
          <h2>Presented to</h2>
        </div>
        <div className="certificate-body">
          <h2>{name}</h2>
          <p>for successfully completing the course</p>
          <h3>{course}</h3>
          <p>with a score of</p>
          <h2>{percentage.toFixed(1)}%</h2>
          <p>Awarded on</p>
          <h3>{date}</h3>
        </div>
        <div className="certificate-footer">
          <div className="signature">
            <p>Course Instructor</p>
            <p>- Alan Walker</p>
          </div>
          <div className="signature">
            <p>Dean of Education</p>
            <p>- John Carter</p>
          </div>
        </div>
      </div>
      <button onClick={downloadCertificate} className="download-btn">
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
