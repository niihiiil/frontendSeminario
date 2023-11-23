import React from 'react';
import { CssBaseline } from '@mui/material';
import Sidebar from './sidebar';
import MainPageContent from './mainpagecontent';

const MainPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <MainPageContent />
      </main>
    </div>
  );
};

export default MainPage;
