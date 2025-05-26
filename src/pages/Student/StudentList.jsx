import React, { useState } from 'react';
import { useSemesterResult } from '../../context/AuthContext';
import './student.css';

const StudentList = () => {
  const { addResult, results } = useSemesterResult();

  // Admin login state
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    courseCode: '',
    branchCode: '',
    rollNo: '',
    enrollmentNo: '',
    name: '',
    hindiName: '',
    fatherName: '',
    gender: '',
    institute: '(648) BABU SUNDER SINGH INSTITUTE OF TECHNOLOGY & MANAGEMENT, LUCKNOW',
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding student on button click
  const handleAddStudent = () => {
    // Basic validation
    if (!formData.rollNo || !formData.name) {
      alert('Please fill in at least Roll No and Name');
      return;
    }

    addResult(formData);

    // Reset form
    setFormData({
      courseCode: '',
      branchCode: '',
      rollNo: '',
      enrollmentNo: '',
      name: '',
      hindiName: '',
      fatherName: '',
      gender: '',
      institute: '(648) BABU SUNDER SINGH INSTITUTE OF TECHNOLOGY & MANAGEMENT, LUCKNOW',
    });
  };

  // Handle admin login
  const handleLogin = () => {
    if (admin.username === 'admin' && admin.password === 'password123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="student-list-container">
      {!isLoggedIn ? (
        <>
          <h2 className="login-heading">Admin Login</h2>
          <div className="input-grid">
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={admin.username}
              onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            />
          </div>
          <button onClick={handleLogin} className="login-btn">
            Login
          </button>
        </>
      ) : (
        <>
          <h2 className="student-form-heading">Student Details Form</h2>
          <div className="input-grid">
            <input
              type="text"
              name="courseCode"
              placeholder="Course Code & Name (e.g., 04)"
              className="input-field"
              value={formData.courseCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="branchCode"
              placeholder="Branch Code & Name (e.g., 10 ENGINEERING)"
              className="input-field"
              value={formData.branchCode}
              onChange={handleChange}
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              className="input-field"
              value={formData.rollNo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="enrollmentNo"
              placeholder="Enrollment No"
              className="input-field"
              value={formData.enrollmentNo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="hindiName"
              placeholder="Hindi Name"
              className="input-field"
              value={formData.hindiName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="fatherName"
              placeholder="Father's Name"
              className="input-field"
              value={formData.fatherName}
              onChange={handleChange}
            />
            <select
              name="gender"
              className="input-field"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="text"
              name="institute"
              className="input-field read-only"
              value={formData.institute}
              readOnly
            />
          </div>

          <button onClick={handleAddStudent} className="submit-btn">
            Add to List
          </button>

          <h2 className="student-list-heading">Student List</h2>
          {results.length === 0 ? (
            <p>No students added yet.</p>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Course Code</th>
                  <th>Branch Code</th>
                  <th>Enrollment No</th>
                  <th>Hindi Name</th>
                  <th>Father's Name</th>
                  <th>Gender</th>
                  <th>Institute</th>
                </tr>
              </thead>
              <tbody>
                {results.map((student, idx) => (
                  <tr key={idx}>
                    <td>{student.rollNo}</td>
                    <td>{student.name}</td>
                    <td>{student.courseCode}</td>
                    <td>{student.branchCode}</td>
                    <td>{student.enrollmentNo}</td>
                    <td>{student.hindiName}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.gender}</td>
                    <td>{student.institute}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default StudentList;
