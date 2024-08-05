import React, { useState } from "react";
import "./CreateQuestionForm.css";
import AdminNav from "../Navbar/AdminNav";
import axiosInstance from "../../../GeneralVariables/AxiosInstance";
import { Spinner } from "react-bootstrap";

const CreateQuestionForm = () => {
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    certificationName: "",
    testDescription: "",
    dificultyLeavel: "easy",
    createdDate: "",
    attendQuestionCount: 0,
    totalAvailableQuestion: 0,
    retakeWaitDays: 0,
    testDuration: 0,
    isActive: true,
    questions: [],
    testImage: null,
  });

  const [questionCount, setQuestionCount] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      testImage: file,
    }));
  };

  const generateQuestions = () => {
    const newQuestions = Array.from({ length: questionCount }, (_, index) => ({
      question: `Question ${formData.questions.length + index + 1}`,
      points: 1,
      correctAnswer: "",
      questionType: "Multiple Choice",
      isActive: true,
      options: ["", "", "", ""],
    }));

    setFormData((prevData) => ({
      ...prevData,
      questions: [...prevData.questions, ...newQuestions],
      totalAvailableQuestion: prevData.questions.length + newQuestions.length,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setFormData((prevData) => {
      const updatedQuestions = [...prevData.questions];
      const updatedOptions = [...updatedQuestions[questionIndex].options];
      updatedOptions[optionIndex] = value;
      updatedQuestions[questionIndex].options = updatedOptions;
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.certificationName ||
      !formData.testDescription ||
      !formData.dificultyLeavel ||
      !formData.createdDate ||
      !formData.testImage ||
      formData.questions.length === 0
    ) {
      alert("Please fill all required fields and add at least one question.");
      return;
    }

    const data = new FormData();
    data.append("CertificationName", formData.certificationName);
    data.append("TestDescription", formData.testDescription);
    data.append("DificultyLeavel", formData.dificultyLeavel);
    data.append("CreatedDate", formData.createdDate);
    data.append("AttendQuestionCount", formData.attendQuestionCount.toString());
    data.append(
      "TotalAvailableQuestion",
      formData.totalAvailableQuestion.toString()
    );
    data.append("RetakeWaitDays", formData.retakeWaitDays.toString());
    data.append("TestDuration", formData.testDuration.toString());
    data.append("IsActive", formData.isActive.toString());
    data.append("TestImage", formData.testImage);

    // Append questions as separate form fields
    formData.questions.forEach((question, index) => {
      data.append(`questions[${index}].question`, question.question);
      data.append(`questions[${index}].points`, question.points.toString());
      data.append(`questions[${index}].correctAnswer`, question.correctAnswer);
      data.append(`questions[${index}].questionType`, question.questionType);
      data.append(`questions[${index}].isActive`, question.isActive.toString());
      question.options.forEach((option, optionIndex) => {
        data.append(`questions[${index}].options[${optionIndex}]`, option);
      });
    });

    try {
      setLoad(true);
      const response = await axiosInstance.post(
        "api/Admin/CreateQuestion",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Form submitted successfully!");

      // Reset form after successful submission
      setFormData({
        certificationName: "",
        testDescription: "",
        dificultyLeavel: "easy",
        createdDate: "",
        attendQuestionCount: 0,
        totalAvailableQuestion: 0,
        retakeWaitDays: 0,
        testDuration: 0,
        isActive: true,
        questions: [],
        testImage: null,
      });
      setQuestionCount(1);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
        alert(
          `An error occurred: ${JSON.stringify(error.response.data.errors)}`
        );
      } else {
        alert("An error occurred while submitting the form.");
      }
    } finally {
      setLoad(false);
    }
  };
  if (load) {
    <div className="spinner-div">
      <Spinner animation="grow" variant="dark" className="custom-spinner" />
    </div>;
  }
  return (
    <div className="total-create-question">
      <AdminNav />
      <form onSubmit={handleSubmit} className="create-question-form">
        <h2 className="question-form-heading">Create Certification Test</h2>

        <div className="input-group custom-input-admin">
          <label>Upload Test Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin">
          <label>Certification Name:</label>
          <input
            type="text"
            name="certificationName"
            value={formData.certificationName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin">
          <label>Test Description:</label>
          <textarea
            name="testDescription"
            value={formData.testDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin">
          <label>Difficulty Level:</label>
          <br />
          <select
            name="dificultyLeavel"
            value={formData.dificultyLeavel}
            onChange={handleInputChange}
            required
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="input-group custom-input-admin">
          <label>Created Date:</label>
          <input
            type="date"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin">
          <label>Attend Question Count:</label>
          <input
            type="number"
            name="attendQuestionCount"
            value={formData.attendQuestionCount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin">
          <label>Retake Wait Days:</label>
          <input
            type="number"
            name="retakeWaitDays"
            value={formData.retakeWaitDays}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin">
          <label>Test Duration (minutes):</label>
          <input
            type="number"
            name="testDuration"
            value={formData.testDuration}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group custom-input-admin checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  isActive: e.target.checked,
                }))
              }
            />
            Is Active
          </label>
        </div>

        <div className="question-generation">
          <button
            type="button"
            className="generate-button"
            onClick={generateQuestions}
          >
            Add Questions
          </button>
        </div>

        <h3 className="question-form-heading">
          Generated Questions: {formData.questions.length}
        </h3>

        {formData.questions.map((question, index) => (
          <div key={index} className="question-edit">
            <textarea
              value={question.question}
              onChange={(e) =>
                handleQuestionChange(index, "question", e.target.value)
              }
              placeholder="Enter question"
              required
            />
            <br />
            <label>Select Question Type</label>
            <br />
            <select
              value={question.questionType}
              onChange={(e) =>
                handleQuestionChange(index, "questionType", e.target.value)
              }
            >
              <option value="Multiple Choice">Multiple Choice</option>
              <option value="True/False">True/False</option>
              <option value="Fillups">Fillups</option>
            </select>
            <br />

            {question.questionType !== "Fillups" &&
              question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>Option {optionIndex + 1}:</label>
                  <br />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </div>
              ))}
            <br />
            <label>Correct Answer:</label>
            <br />
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(index, "correctAnswer", e.target.value)
              }
              placeholder="Correct Answer"
              required
            />
            <br />

            <hr />
            <br />
          </div>
        ))}

        <button type="submit" className="generate-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
