import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Timer from "./Timer";

function TestNavbar({ testName, expiryTime, duration }) {
  function MobileSubmit() {}
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary custom-test-nav"
      sticky="top"
    >
      <Container fluid>
        <Navbar.Brand href="#" className="test-name">
        {testName}
        </Navbar.Brand>
        <div className="mobile-timer">
          <Timer
            time={expiryTime}
            totalTime={duration}
            submitFunction={MobileSubmit}
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default TestNavbar;
