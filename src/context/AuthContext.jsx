// Your context file (AuthContext.js)
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const SemesterResultContext = createContext();
export const useSemesterResult = () => useContext(SemesterResultContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user && user !== "undefined") {
        setCurrentUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    }
  }, []);

  useEffect(() => {
    try {
      const savedResults = localStorage.getItem('semesterResults');
      if (savedResults && savedResults !== "undefined") {
        setResults(JSON.parse(savedResults));
      }
    } catch (error) {
      console.error("Failed to parse semesterResults from localStorage", error);
      localStorage.removeItem('semesterResults');
    }
  }, []);

  const login = useCallback((user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  }, []);

  const addResult = useCallback((newResult) => {
    setResults(prevResults => {
      const updatedResults = [...prevResults, newResult];
      localStorage.setItem('semesterResults', JSON.stringify(updatedResults));
      return updatedResults;
    });
  }, []);

  const removeResult = useCallback((rollNo) => {
    setResults(prevResults => {
      const updatedResults = prevResults.filter(student => student.rollNo !== rollNo);
      localStorage.setItem('semesterResults', JSON.stringify(updatedResults));
      return updatedResults;
    });
  }, []);

  const editResult = useCallback((updatedStudent) => {
    setResults(prevResults => {
      const updatedResults = prevResults.map(student =>
        student.rollNo === updatedStudent.rollNo ? updatedStudent : student
      );
      localStorage.setItem('semesterResults', JSON.stringify(updatedResults));
      return updatedResults;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      <SemesterResultContext.Provider value={{ results, addResult, removeResult, editResult }}>
        {children}
      </SemesterResultContext.Provider>
    </AuthContext.Provider>
  );
};
