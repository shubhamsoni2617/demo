import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, ToggleButton } from '@mui/material';
import CustomCard from '../../components/CustomCard';
import { UserContext } from '../../App';
import { Box } from '@mui/system';
import DataCard from '../../components/DataCard';
import CustomToggleButtonGroup from '../../components/CustomToggleButtonGroup';
import DashboardTable from './DashboardTable';
import AlertsTable from './AlertsTable';

const styles = (theme) => ({
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
  switchTab: {
    border: '1px solid #BEDBEB',
    borderRadius: '4px !important',
  },
  toggleRoot: {
    padding: '6px 16px',
    borderRight: '1px solid #BEDBEB !important',
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',

    '& .MuiTouchRipple-root': {
      borderRight: '1px solid #BEDBEB !important',
    },
  },
  toggleRootLast: {
    padding: '6px 16px',
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',
  },
  toggleActive: {
    padding: '6px 16px',
    background: `#44677B !important`,
    color: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
  switchTabText: {
    color: 'inherit',
    textTransform: 'capitalize',
    margin: 0,
  },
  tabContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    margin: '16px 0',
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

const FilterOne = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();

  const { configData, dataCardValues, tabs } = props;

  const [activeSwitchTab, setActiveSwitchTab] = useState('alerts');

  const handleSwitch = (_, newAlignment) => {
    setActiveSwitchTab(newAlignment);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {dataCardValues?.map((cardValue, cardIndex) => (
            <Grid item xs={12} md={4} key={`data-card-${cardIndex}`}>
              <CustomCard cardStyles={classes.headerCard}>
                <DataCard data={cardValue} />
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            padding: '0 8px',
            margin: '8px 0',
          }}
        >
          <div className={classes.tabContainer}>
            <CustomToggleButtonGroup
              value={activeSwitchTab}
              handleSwitch={handleSwitch}
              borderRadius={8}
              customClasses={{
                tab: classes.switchTab,
              }}
            >
              {tabs.map((tab, index) => (
                <ToggleButton
                  value={tab.value}
                  aria-label='left aligned'
                  key={`tab-${tab.value}`}
                  classes={{
                    root:
                      index === tabs?.length - 1
                        ? classes.toggleRootLast
                        : classes.toggleRoot,
                    selected: classes.toggleActive,
                  }}
                >
                  <p className={classes.switchTabText}>{tab.label}</p>
                </ToggleButton>
              ))}
            </CustomToggleButtonGroup>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {activeSwitchTab === 'alerts' ? (
          <CustomCard cardStyles={classes.headerCard}>
            <AlertsTable
              user={user}
              tableCells={configData[0]?.['Table']}
              tableConfig={configData[0]?.['Table Config']}
              tabs={configData[0]?.['Table Tabs']}
              filters={configData[0]?.['Table Filters']}
              switches={configData[0]?.['Table Groups']}
            />
          </CustomCard>
        ) : (
          <CustomCard cardStyles={classes.headerCard}>
            <DashboardTable
              user={user}
              // tableCells={configData[0]?.['Table']}
              // tableConfig={configData[0]?.['Table Config']}
              tableCells={configData[0]?.['Executive Summary Products']}
              tableConfig={configData[0]?.['Executive Summary Products Config']}
              tabs={configData[0]?.['Table Tabs']}
              filters={configData[0]?.['Table Filters']}
              switches={configData[0]?.['Table Groups']}
            />
          </CustomCard>
        )}
      </Grid>
    </Grid>
  );
};

export default FilterOne;
