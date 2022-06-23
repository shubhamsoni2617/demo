import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Components from '../pages/Components';
import PricingCockpit from '../pages/PricingCockpit';

const Wawa = () => {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <MainLayout>
              <PricingCockpit />
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

export default Wawa;
