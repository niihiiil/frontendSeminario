// src/components/layout/MainPageContainer.js
import React from 'react';
import { CssBaseline } from '@mui/material';
import Sidebar from './sidebar';
//import MainPageContent from './mainpagecontent';

const MainPageContainer = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};

export default MainPageContainer;
