import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import SimpleTabs from '../components/SimpleTabs';
import { discountTabs } from '../pages/Components/data';
import { Box } from '@mui/system';
import { Table } from '../components/Table';
import {
  promoDiscountsConfig,
  simulationsConfig,
} from '../pages/ExecutiveSummary/config';

const styles = (theme) => ({
  container: {
    padding: '24px 40px',
  },
  header: {
    ...theme.typography.fontSizes.unitText,
    fontWeight: theme.typography.fontWeight.bold,
    marginTop: 0,
  },
  tabIndicator: {
    height: '4px',
    borderRadius: '4px',
    background: '#44677b',
  },
  tab: {
    color: `${theme.palette.stroke}`,
    fontSize: theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.medium,
    textTransform: theme.typography.textTransform.capitalize,
    padding: '20px 16px',
  },
  activeTab: {
    color: `#44677b !important`,
    fontSize: theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.semiBold,
    textTransform: theme.typography.textTransform.capitalize,
    padding: '20px 16px',
  },
});

const useStyles = makeStyles(styles);

const SimulationTable = ({ data, state }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <p className={classes.header}>Simulation Results</p>
      <Table
        rowData={data}
        columnDefs={simulationsConfig[state]}
        pagination={false}
        floatingFilter={false}
        height={state === 1 ? 168 : 112}
      />
    </div>
  );
};

export default SimulationTable;
