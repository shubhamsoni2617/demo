import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import CustomCard from '../../components/CustomCard';
import DashboardTable from './DashboardTable';
import { UserContext } from '../../App';
import { Box } from '@mui/system';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import DataLabels from '../../components/DataLabels';
import DataCard from '../../components/DataCard';
import SimpleTabs from '../../components/SimpleTabs';

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
  filtersHeader: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    padding: '0 16px',
  },
  filtersHeaderTitle: {
    margin: '0 48px 0 0',
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  markDownContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    height: '100%',
    padding: '16px 32px',
  },
  markDownTitle: {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 600,
  },
  markDownMetricContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '8px 16px',
    width: '260px',
  },
  markDownMetricTitle: {
    margin: 0,
    fontSize: '0.75rem',
    fontWeight: 500,
    color: theme.palette.textDark,
  },
  markDownMetricValue: {
    margin: 0,
    fontSize: '1.15rem',
    fontWeight: 500,
    color: theme.palette.textDark,
  },
  filters: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartEnd,
    flexWrap: theme.content.flexStyles.flexWrap.wrap,
    padding: '16px',
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

const FilterTwo = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();
  const {
    configData,
    dataLabels,
    dataCardValues,
    markDownTitle,
    markDownData,
    dates,
    tabs,
    tabIndex,
    setDates,
    handleTabChange,
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8.8} xl={9.5}>
            <CustomCard cardStyles={classes.headerCard} fullHeight={true}>
              <div
                className={classes.container}
                style={{
                  border: '0.5px solid #CCD8E3',
                  borderRadius: 4,
                }}
              >
                {Object.keys(dataLabels)?.map((key, index) => (
                  <DataLabels key={key} label={key} value={dataLabels[key]} />
                ))}
              </div>
            </CustomCard>
          </Grid>
          <Grid item xs={12} md={3.2} xl={2.5}>
            <CustomCard cardStyles={classes.headerCard} fullHeight={true}>
              <div className={classes.dateContainer}>
                <CustomDateRangePicker
                  label={'Time Period'}
                  labeldirection={'row'}
                  values={dates}
                  isMandatory={false}
                  onChange={(values) => setDates(values)}
                />
              </div>
            </CustomCard>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={3}>
          {dataCardValues?.map((cardValue, cardIndex) => (
            <Grid item xs={12} md={3} key={`data-card-${cardIndex}`}>
              <CustomCard cardStyles={classes.headerCard}>
                <DataCard data={cardValue} />
              </CustomCard>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CustomCard cardStyles={classes.headerCard}>
          <div className={classes.markDownContainer}>
            <p className={classes.markDownTitle}>{markDownTitle}</p>
            {markDownData && markDownData['Recommended Units'] ? (
              <div
                className={classes.markDownMetricContainer}
                style={{ background: 'rgb(47 137 227 / 8%)' }}
              >
                <p className={classes.markDownMetricTitle}>Recommended Units</p>
                <p className={classes.markDownMetricValue}>
                  {markDownData['Recommended Units'] < 10 ? 0 : null}
                  {markDownData['Recommended Units']}
                </p>
              </div>
            ) : null}
            {markDownData && markDownData['Planned Units'] ? (
              <div
                className={classes.markDownMetricContainer}
                style={{ background: 'rgb(89 47 227 / 8%)' }}
              >
                <p className={classes.markDownMetricTitle}>Planned Units</p>
                <p className={classes.markDownMetricValue}>
                  {markDownData['Planned Units'] < 10 ? 0 : null}
                  {markDownData['Planned Units']}
                </p>
              </div>
            ) : null}
            {markDownData && markDownData['Approved'] ? (
              <div
                className={classes.markDownMetricContainer}
                style={{ background: 'rgb(47 227 75 / 8%)' }}
              >
                <p className={classes.markDownMetricTitle}>Approved</p>
                <p className={classes.markDownMetricValue}>
                  {markDownData['Approved'] < 10 ? 0 : null}
                  {markDownData['Approved']}
                </p>
              </div>
            ) : null}
          </div>
        </CustomCard>
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
          <SimpleTabs
            items={tabs}
            value={tabIndex}
            handleChange={handleTabChange}
            customClasses={{
              indicator: classes.tabIndicator,
              tab: classes.tab,
              activeTab: classes.activeTab,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
};

export default FilterTwo;
