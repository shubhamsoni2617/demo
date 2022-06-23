import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import FilterOne from './FilterOne';

const styles = (theme) => ({
  title: {
    margin: '30px 10px 10px 10px',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  headerCard: {
    ...theme.content.card,
    width: '100%',
    height: '100%',
    overflow: theme.content.overflow.visible,
  },
  container: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  dateContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    height: '100%',
  },
  tabIndicator: {
    height: '4px',
    borderRadius: '4px',
    background: '#44677b',
  },
  tab: {
    color: `${theme.palette.stroke}`,
    fontSize: '1.2rem',
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: theme.typography.textTransform.capitalize,
    padding: '20px 16px',
  },
  activeTab: {
    color: `#44677b !important`,
    fontSize: '1.2rem',
    fontWeight: theme.typography.fontWeight.semiBold,
    textTransform: theme.typography.textTransform.capitalize,
    padding: '20px 16px',
  },
  headerBox: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  iconButton: {
    fontSize: '24px !important',
  },
  startIcon: {
    display: 'inherit',
    margin: 0,
  },
  selectTitle: {
    ...theme.typography.fontSizes.normalText,
    color: theme.palette.textDark,
    margin: 0,
    marginRight: 16,
  },
  legend: {
    ...theme.typography.fontSizes.normalText,
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    margin: '8px 0',
  },
  legendMarker1: {
    background: theme.palette.bgSuccess,
    borderRadius: '50%',
    marginRight: 8,
    height: 8,
    width: 8,
  },
  legendMarker2: {
    background: '#B1BEFF',
    borderRadius: '50%',
    marginRight: 8,
    height: 8,
    width: 8,
  },
  legendMarker3: {
    background: theme.palette.bgDanger,
    borderRadius: '50%',
    marginRight: 8,
    height: 8,
    width: 8,
  },
});

const useStyles = makeStyles(styles);

const DashboardSummary = ({ appliedFilters }) => {
  const classes = useStyles();

  const handleOnSelect = ({ selectedItems, type }) => {
    console.log('Selected', selectedItems);
  };

  return (
    <div>
      {appliedFilters && Object.keys(appliedFilters).length > 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FilterOne
              appliedFilters={appliedFilters}
              handleOnSelect={handleOnSelect}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default DashboardSummary;
