import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ExecutiveSummary from '../pages/ExecutiveSummary';
import Components from '../pages/Components';
import Migrate from '../Organisms/Migrate';

const Carter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <ExecutiveSummary />
            </MainLayout>
          }
        />
        <Route
          path='/components'
          element={
            <MainLayout>
              <Components />
            </MainLayout>
          }
        />
        <Route
          path='/migrate'
          element={
            <MainLayout>
              <Migrate />
            </MainLayout>
          }
        />
        <Route
          path='*'
          element={
            <MainLayout>
              <h1>No Results Found...</h1>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default Carter;
