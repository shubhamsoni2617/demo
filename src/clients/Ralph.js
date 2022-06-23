import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Components from '../pages/Components';
import DecisionDashboard from '../pages/DecisionDashboard';

const Ralph = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Components />
            </MainLayout>
          }
        />
        <Route
          path='/decision-dashboard'
          element={
            <MainLayout>
              <DecisionDashboard />
            </MainLayout>
          }
        />
        <Route
          path='*'
          element={
            <MainLayout>
              <h1>Test</h1>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default Ralph;
