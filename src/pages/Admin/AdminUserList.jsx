import React from 'react';
import './admin.css';

export const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Admin',
    status: 'Active',
    username: 'alice.admin',
    password: 'Alice@123',
  },
  {
    id: 2,
    name: 'Bob Smith',
    role: 'Student',
    status: 'Inactive',
    username: 'bob.student',
    password: 'Bob@123',
  },
  {
    id: 3,
    name: 'Charlie Singh',
    role: 'Faculty',
    status: 'Active',
    username: 'charlie.faculty',
    password: 'Charlie@123',
  },
  {
    id: 4,
    name: 'David Roy',
    role: 'Admin',
    status: 'Active',
    username: 'david.admin',
    password: 'David@123',
  },
  {
    id: 5,
    name: 'Eva Patel',
    role: 'Student',
    status: 'Active',
    username: 'eva.student',
    password: 'Eva@123',
  },
  {
    id: 6,
    name: 'Fatima Khan',
    role: 'Faculty',
    status: 'Inactive',
    username: 'fatima.khan',
    password: 'Fatima@123',
  },
];

const AdminUserList = () => {
  return (
    <div className="admin-container">
      <h2 className="title">Admin User List</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
