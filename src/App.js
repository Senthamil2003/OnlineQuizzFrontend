import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Test from "./Components/User/Test/Test";
import Home from "./Components/User/Home/Home";
import TestResult from "./Components/User/Test/TestResult";
import "react-circular-progressbar/dist/styles.css";
import Certificate from "./Components/User/Certificate/Certificate";
import LeaderBoard from "./Components/User/LeaderBoard/LeaderBoard";
import TestDisplay from "./Components/User/AllTest/AllTest";
import "react-toastify/dist/ReactToastify.css";
import History from "./Components/User/TestHistory/History";
import Favourite from "./Components/User/MyFavourites/Favourite";
import TestPreview from "./Components/User/Test/TestPreview";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import { useState } from "react";

import CreateQuestionForm from "./Components/Admin/CreateQuestion/CreateQuestionForm";
import AdminAllTest from "./Components/Admin/AllTest/AdminAllTest";

function App() {
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<Test />} />

          <Route path="/result" element={<TestResult />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/alltest" element={<TestDisplay />} />
          <Route path="/history" element={<History />} />
          <Route path="/myfavourite" element={<Favourite />} />
          <Route path="/testpreview" element={<TestPreview />} />
          {/* </Route> */}

          <Route path="/login" element={<Login />} />
          <Route path="/adminviewtest" element={<AdminAllTest />} />
          <Route
            path="/createQuestion"
            element={<CreateQuestionForm />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
