import React, { useState } from 'react';
import { useSemesterResult } from '../../context/AuthContext';  // Your custom context hook
import './profile.css';

const UserProfile = () => {
  const { results, removeResult, addResult } = useSemesterResult();

  const [isEditing, setIsEditing] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // Remove student after confirmation
  const handleRemoveStudent = (rollNo) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      removeResult(rollNo);
    }
  };

  // Open edit form for selected student
  const handleEditStudent = (student) => {
    setIsEditing(true);
    setEditStudent({ ...student }); // Avoid direct mutation
  };

  // Save edited student and close form
  const handleSaveEdit = () => {
    if (
      !editStudent.name ||
      !editStudent.courseCode ||
      !editStudent.rollNo ||
      !editStudent.enrollmentNo
    ) {
      alert("Please fill all fields");
      return;
    }
    addResult(editStudent); // Replace existing entry
    setIsEditing(false);
    setEditStudent(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditStudent(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">User Profile</h2>
      <h3 className="user-profile-subtitle">Your Added Students</h3>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Course</th>
              <th>Roll No</th>
              <th>Enrollment No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No student data found.
                </td>
              </tr>
            )}
            {results.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.courseCode}</td>
                <td>{student.rollNo}</td>
                <td>{student.enrollmentNo}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(student.rollNo)}
                    className="view-result-btn"
                    style={{ marginRight: '6px' }}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditStudent(student)}
                    className="view-result-btn"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && (
        <div className="edit-student-form">
          <h3>Edit Student Details</h3>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editStudent.name}
              onChange={handleChange}
              placeholder="Student Name"
            />
          </div>
          <div>
            <label>Course</label>
            <input
              type="text"
              name="courseCode"
              value={editStudent.courseCode}
              onChange={handleChange}
              placeholder="Course Code"
            />
          </div>
          <div>
            <label>Roll No (cannot change)</label>
            <input
              type="text"
              name="rollNo"
              value={editStudent.rollNo}
              disabled
            />
          </div>
          <div>
            <label>Enrollment No</label>
            <input
              type="text"
              name="enrollmentNo"
              value={editStudent.enrollmentNo}
              onChange={handleChange}
              placeholder="Enrollment Number"
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <button
              type="button"
              onClick={handleSaveEdit}
              className="save-btn"
              style={{ marginRight: '8px' }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
