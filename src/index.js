import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { LicenseManager } from 'ag-grid-enterprise';

const LICENSE_KEY =
  'CompanyName=Impact Analytics,LicensedGroup=31Jan22 Purchase,LicenseType=MultipleApplications,LicensedConcurrentDeveloperCount=1,LicensedProductionInstancesCount=0,AssetReference=AG-025014,ExpiryDate=31_January_2023_[v2]_MTY3NTEyMzIwMDAwMA==e4f58ef1fe10261cf66aa1e5a5cb2da6';
LicenseManager.setLicenseKey(LICENSE_KEY);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
