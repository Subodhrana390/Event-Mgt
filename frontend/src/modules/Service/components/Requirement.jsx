import React, { useState } from "react";

const FiverrQuestions = ({ formData, setFormData }) => {
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionDetails, setNewQuestionDetails] = useState("");

  const addQuestion = () => {
    if (!newQuestionText.trim()) return;

    const newQuestion = {
      text: newQuestionText,
      details: newQuestionDetails,
    };

    setFormData((prevData) => ({
      ...prevData,
      questions: [...(prevData.questions || []), newQuestion],
    }));

    setNewQuestionText("");
    setNewQuestionDetails("");
  };

  const removeQuestion = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter((_, i) => i !== index),
    }));
  };
  

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <header className="mb-8 text-center">
        <h6 className="text-3xl font-bold text-gray-800">
          Get all the information you need from buyers
        </h6>
        <p className="text-gray-600 mt-3">
          Add questions to help buyers provide you with exactly what you need to
          start working on their order.
        </p>
      </header>

      <section className="space-y-6">
        <div>
          <strong className="block text-xl font-semibold text-gray-700 mb-3">
            Your Questions
          </strong>
          <p className="text-gray-500">
            Ensure your questions do not duplicate the Fiverr questions.
          </p>
        </div>

        <ul className="list-none pl-0 space-y-4">
          {formData.questions?.map((question, index) => (
            <li
              key={index}
              className="bg-gray-50 p-5 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-gray-700">{question.text}</span>
                {question.details && (
                  <p className="text-gray-500 mt-2">{question.details}</p>
                )}
              </div>
              <button
                onClick={() => removeQuestion(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none transition-all"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div>
          <strong className="block text-xl font-semibold text-gray-700 mb-3">
            Add New Question
          </strong>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter question text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Enter question details (optional)"
              value={newQuestionDetails}
              onChange={(e) => setNewQuestionDetails(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addQuestion}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-all"
            >
              + Add Question
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FiverrQuestions;
