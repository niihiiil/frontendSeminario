// src/components/layout/MainPageContainer.js
import React from 'react';
import { Container, Box, Button, CssBaseline } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import Sidebar from './sidebar';
//import MainPageContent from './mainpagecontent';

const MainPageContainer = ({ children }) => {
  const history = useHistory();

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => history.goBack()}
            variant="outlined"
            sx={{
              mb: 2,
              alignSelf: 'flex-start',
              color: 'primary.main',
              borderColor: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              }
            }}
          >
            Volver
          </Button>
          <main style={{ flexGrow: 1, padding: '20px' }}>
            {children}
          </main>
        </Box>
      </Container>
    </div>
  );
};

export default MainPageContainer;
