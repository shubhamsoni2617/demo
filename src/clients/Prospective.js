import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Prospective from '../pages/Prospective';

import Components from '../pages/Components';

const ProspectiveClient = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <Prospective />
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

export default ProspectiveClient;
