import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import SimpleTabs from '../components/SimpleTabs';
import { discountTabs } from '../pages/Components/data';
import { Box } from '@mui/system';
import { Table } from '../components/Table';
import { promoDiscountsConfig } from '../pages/ExecutiveSummary/config';
import CustomButton from '../components/CustomButton';

const styles = (theme) => ({
  container: {
    background: theme.palette.bgTransparent,
  },
  simulateContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    margin: 16,
  },
  tableContainer: {
    padding: '24px 40px',
  },
  headerContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  header: {
    ...theme.typography.fontSizes.unitText,
    fontWeight: theme.typography.fontWeight.bold,
    margin: 0,
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

const Discounts = ({ discounts, state }) => {
  const classes = useStyles();

  const [tabOptions, setTabOptions] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (state === 1) {
      setTabOptions([...discountTabs.optimize]);
      setTabIndex(1);
    } else {
      setTabOptions([...discountTabs.simulate]);
      setTabIndex(0);
    }
  }, [state]);

  return (
    <div className={classes.container}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '0 24px' }}>
        <SimpleTabs
          items={tabOptions}
          value={tabIndex}
          handleChange={handleTabChange}
          customClasses={{
            indicator: classes.tabIndicator,
            tab: classes.tab,
            activeTab: classes.activeTab,
          }}
        />
      </Box>
      <div className={classes.tableContainer}>
        <div className={classes.headerContainer}>
          <p className={classes.header}>Weekly Discount Percentages</p>
          <CustomButton
            isPrimary={true}
            variant='outlined'
            height={28}
            width={104}
            minWidth={0}
            padding={'16px'}
            label='+  Scenario'
            onButtonClick={() => console.log('Scenario')}
          />
        </div>
        <Table
          rowData={discounts[tabOptions[tabIndex]?.id]}
          columnDefs={promoDiscountsConfig}
          pagination={false}
          floatingFilter={false}
          height={'112px'}
        />

        <div className={classes.simulateContainer}>
          <CustomButton
            isPrimary={state === 1 ? false : true}
            disabled={state === 1}
            variant='contained'
            height={28}
            width={120}
            minWidth={0}
            padding={'16px'}
            label='Simulate'
            onButtonClick={() => console.log('Simulate')}
          />
        </div>
      </div>
    </div>
  );
};

export default Discounts;
