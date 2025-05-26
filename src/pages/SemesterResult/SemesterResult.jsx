import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sem.css';
import logo from '../../assets/logo.jpg'; // Your institute logo

const SemesterResult = () => {
  const navigate = useNavigate();
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [inputRoll, setInputRoll] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    try {
      const storedResultData = localStorage.getItem('facultyResultData');
      if (storedResultData && storedResultData !== 'undefined') {
        const parsedData = JSON.parse(storedResultData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setAllResults(parsedData);
        } else {
          setAllResults([]);
        }
      } else {
        setAllResults([]);
      }
    } catch (error) {
      console.error('Error parsing result data:', error);
      setAllResults([]);
    }
  }, []);

  const handleViewResult = () => {
    const matchingResults = allResults.filter(
      (result) => result.rollNo === inputRoll.trim()
    );
    if (matchingResults.length > 0) {
      setFilteredResults(matchingResults);
      setSelectedIndex(0);
      setShowPopup(false);
      setErrorMsg('');
    } else {
      setErrorMsg('Roll Number not found. Please try again.');
    }
  };

  if (showPopup) {
    return (
      <div className="popup-overlay">
        <div className="popup-box">
          <h2>Enter Roll Number</h2>
          <input
            type="text"
            value={inputRoll}
            onChange={(e) => setInputRoll(e.target.value)}
            placeholder="Enter your Roll Number"
            className="input"
          />
          {errorMsg && <p className="error">{errorMsg}</p>}
          <button
            type="button"
            onClick={handleViewResult}
            className="btn-submit"
          >
            View Result
          </button>
        </div>
      </div>
    );
  }

  if (filteredResults.length === 0) {
    return <div className="result-container">Loading results...</div>;
  }

  const selectedResult = filteredResults[selectedIndex];
  if (!selectedResult) {
    return <div className="result-container">No result selected.</div>;
  }

  const {
    semester,
    evenOdd,
    resultStatus,
    declarationDate,
    subjects,
    rollNo,
    name,
    enrollmentNo,
    course,
  } = selectedResult;

  return (
    <div className="result-container">
      <div
        className="header-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h2 className="result-title">
          Babu Sunder Singh Institute Of Technology & Management Lucknow
        </h2>
        <img src={logo} alt="Institute Logo" className="logo" />
      </div>

      {filteredResults.length > 1 && (
        <div className="select-result">
          <label htmlFor="resultSelect">Select Result:</label>
          <select
            id="resultSelect"
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(parseInt(e.target.value))}
            className="input"
          >
            {filteredResults.map((result, idx) => (
              <option key={idx} value={idx}>
                {result.name} - Semester {result.semester} ({result.evenOdd})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="result-summary">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Enrollment Number:</strong> {enrollmentNo}</p>
        <p><strong>Course:</strong> {course}</p>
        <p><strong>Roll Number:</strong> {rollNo}</p>
      </div>

      <div className="right">
        <p><strong>Semester:</strong> {semester}</p>
        <p><strong>Even/Odd:</strong> {evenOdd}</p>
        <p><strong>Status:</strong> {resultStatus}</p>
        <p><strong>Declaration Date:</strong> {declarationDate}</p>
      </div>

      <div className="result-table">
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Internal</th>
              <th>External</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects &&
              subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.name}</td>
                  <td>{subject.internalMarks}</td>
                  <td>{subject.externalMarks}</td>
                  <td>{subject.totalMarks}</td>
                  <td>{subject.grade}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SemesterResult;
