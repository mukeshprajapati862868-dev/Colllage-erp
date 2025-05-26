// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';

// Pages
import Login from './pages/Auth/Login';
// import Signup from './pages/Auth/Signup';
import DashboardHome from './pages/Dashboard/DashboardHome';
import StudentList from './pages/Student/StudentList';
import FacultyList from './pages/Faculty/FacultyList';
import AdminUserList from './pages/Admin/AdminUserList';
import SemesterResult from './pages/SemesterResult/SemesterResult';
import UserProfile from './pages/UserProfile/UserProfile';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary>
          <Navbar />
          <div className="flex">
            {/* <Sidebar /> */}
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/login" element={<Login />} />
                {/* <Route path="/signup" element={<Signup />} /> */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <DashboardHome />
                  </ProtectedRoute>
                } />
                <Route path="/students" element={
                  <ProtectedRoute>
                    <StudentList />
                  </ProtectedRoute>
                } />
                <Route path="/faculty" element={
                  <ProtectedRoute>
                    <FacultyList />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminUserList />
                  </ProtectedRoute>
                } />
                <Route path="/semester-result" element={
                  <ProtectedRoute>
                    <SemesterResult />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
          </div>
          <Footer />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
};

export default App;
