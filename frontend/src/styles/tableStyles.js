import { alpha } from '@mui/material/styles';

export const getTableStyles = (theme) => ({
  tableContainerStyles: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  headerCellStyle: {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[900] 
      : theme.palette.grey[100],
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    fontSize: '0.875rem',
  },
  bodyCellStyle: {
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  rowStyles: {
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.grey[800] 
        : theme.palette.grey[50],
    },
  },
  actionsCellStyle: {
    display: 'flex',
    gap: theme.spacing(1),
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  buttonStyles: {
    fontSize: '12px',
    marginRight: '8px',
  },
}); 