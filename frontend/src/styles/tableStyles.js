import { alpha } from '@mui/material/styles';

export const getTableStyles = (theme) => {
  return {
    headerCellStyle: {
      fontSize: '15px',
      fontWeight: 'bold',
      color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
      textAlign: 'left',
      padding: '16px',
      paddingLeft: '20px',
      backgroundColor: theme.palette.primary.main,
    },

    rowStyles: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.primary.main, 0.15)
          : alpha(theme.palette.primary.main, 0.05),
      },
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
          ? alpha(theme.palette.primary.main, 0.25)
          : alpha(theme.palette.primary.main, 0.1),
      },
    },

    bodyCellStyle: {
      fontSize: '14px',
      textAlign: 'left',
      padding: '16px',
      paddingLeft: '20px',
      color: theme.palette.text.primary,
    },

    actionsCellStyle: {
      fontSize: '14px',
      textAlign: 'left',
      padding: '16px',
      paddingLeft: '15px',
      color: theme.palette.text.primary,
    },

    buttonStyles: {
      fontSize: '12px',
      marginRight: '8px',
    },

    tableContainerStyles: {
      marginTop: '20px',
      margin: 'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
    }
  };
}; 