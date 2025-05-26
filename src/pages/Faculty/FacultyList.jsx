import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSemesterResult } from '../../context/AuthContext';
import { users } from '../Admin/AdminUserList';
import './faculty.css';

const FacultyList = () => {
  const { results: students } = useSemesterResult();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [semester, setSemester] = useState('');
  const [evenOdd, setEvenOdd] = useState('');
  const [resultStatus, setResultStatus] = useState('CP0');
  const [declarationDate, setDeclarationDate] = useState('');
  const [subjects, setSubjects] = useState(
    Array(6).fill({ name: '', internalMarks: '', externalMarks: '', totalMarks: 0, grade: '' })
  );

  const navigate = useNavigate();

  // Filter faculty users from AdminUserList
  const facultyUsers = users.filter(user => user.role === 'Faculty');

  const handleLogin = () => {
    const matchedUser = facultyUsers.find(
      user => user.username === username && user.password === password
    );

    if (matchedUser) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid faculty credentials.');
    }
  };

  const handleStudentSelect = (e) => {
    const rollNo = e.target.value;
    const student = students.find(s => s.rollNo === rollNo);
    setSelectedStudent(student || null);
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index], [field]: value };

    if (field === 'internalMarks' || field === 'externalMarks') {
      const internal = parseInt(updated[index].internalMarks || 0);
      const external = parseInt(updated[index].externalMarks || 0);
      const total = internal + external;
      const grade = total >= 90 ? 'A' : total >= 75 ? 'B+' : 'C';

      updated[index].totalMarks = total;
      updated[index].grade = grade;
    }

    setSubjects(updated);
  };

  const handleSubmit = () => {
    if (!selectedStudent || !semester || !evenOdd || !declarationDate) {
      alert('Please fill all required fields.');
      return;
    }

    const resultEntry = {
      semester,
      evenOdd,
      resultStatus,
      declarationDate,
      subjects,
      rollNo: selectedStudent.rollNo,
      dob: selectedStudent.dob,
      name: selectedStudent.name,
      enrollmentNo: selectedStudent.enrollmentNo,
      course: selectedStudent.courseCode,
    };

    const existingResultsRaw = localStorage.getItem('facultyResultData');
    let existingResults = [];
    if (existingResultsRaw && existingResultsRaw !== 'undefined') {
      try {
        existingResults = JSON.parse(existingResultsRaw);
        if (!Array.isArray(existingResults)) existingResults = [];
      } catch {
        existingResults = [];
      }
    }

    existingResults.push(resultEntry);
    localStorage.setItem('facultyResultData', JSON.stringify(existingResults));
    alert('Result added successfully!');
    navigate('/semester-result');
  };

  return (
    <div className="faculty-container">
      {!isLoggedIn ? (
        <div className="login-popup">
          <h2 className="title">Faculty Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <button onClick={handleLogin} className="btn btn-submit">Login</button>
          {loginError && <p className="error">{loginError}</p>}
        </div>
      ) : (
        <>
          <h2 className="title">Faculty Result Entry</h2>
          <div className="form-section">
            <label>Select Student:</label>
            <select onChange={handleStudentSelect} className="input" defaultValue="">
              <option value="" disabled>
                -- Select Student by Roll No --
              </option>
              {students.map(student => (
                <option key={student.rollNo} value={student.rollNo}>
                  {student.rollNo} - {student.name}
                </option>
              ))}
            </select>

            {selectedStudent && (
              <>
                <input type="text" value={selectedStudent.name} readOnly className="input readonly" />
                <input type="text" value={selectedStudent.rollNo} readOnly className="input readonly" />
                <input type="date" value={selectedStudent.dob} readOnly className="input readonly" />
                <input type="text" value={selectedStudent.enrollmentNo} readOnly className="input readonly" />
                <input type="text" value={selectedStudent.courseCode} readOnly className="input readonly" />
              </>
            )}

            <input type="text" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="input" />
            <input type="text" placeholder="Even/Odd" value={evenOdd} onChange={(e) => setEvenOdd(e.target.value)} className="input" />
            <input type="text" placeholder="Result Status" value={resultStatus} onChange={(e) => setResultStatus(e.target.value)} className="input" />
            <input type="date" value={declarationDate} onChange={(e) => setDeclarationDate(e.target.value)} className="input" />
          </div>

          {subjects.map((subject, index) => (
            <div key={index} className="subject-section">
              <h4>Subject {index + 1}</h4>
              <input type="text" placeholder="Subject Name" value={subject.name} onChange={(e) => handleSubjectChange(index, 'name', e.target.value)} className="input" />
              <input type="number" placeholder="Internal Marks" value={subject.internalMarks} onChange={(e) => handleSubjectChange(index, 'internalMarks', e.target.value)} className="input" />
              <input type="number" placeholder="External Marks" value={subject.externalMarks} onChange={(e) => handleSubjectChange(index, 'externalMarks', e.target.value)} className="input" />
              <input type="number" placeholder="Total Marks" value={subject.totalMarks} readOnly className="input readonly" />
              <input type="text" placeholder="Grade" value={subject.grade} readOnly className="input readonly" />
            </div>
          ))}

          <button onClick={handleSubmit} className="btn btn-submit">
            Add Result
          </button>
        </>
      )}
    </div>
  );
};

export default FacultyList;
