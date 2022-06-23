import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { Box } from '@mui/system';
import { Grid, ToggleButton } from '@mui/material';
import { fiscalCalendar } from '../Components/data';
import SimpleTabs from '../../components/SimpleTabs';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomToggleButtonGroup from '../../components/CustomToggleButtonGroup';

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TimelineOutlined from '@mui/icons-material/TimelineOutlined';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import Chart from '../../utils/charts/Chart';

const styles = (theme) => ({
  title: {
    margin: '0',
    fontSize: '1.05rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '0 32px',
  },
  body: {
    padding: '8px 32px',
  },
  fiscalFilters: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    width: '100%',
  },
  fiscalDates: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    marginTop: 4,
    height: 37,
    background: theme.palette.bgBadgeLight,
    border: `1px solid ${theme.palette.stroke}`,
    padding: '4px 8px',
    borderRadius: 4,
  },
  fiscalDateText: {
    fontSize: '0.75rem',
    marginRight: 8,
  },
  toggleRoot: {
    padding: '4px',
    background: theme.palette.bgBadgeLight,
    border: 'none',
  },
  toggleActive: {
    padding: '4px',
    background: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
  data: {
    margin: '16px 0',
  },
  forecastData: {
    height: '100%',
    border: `0.5px solid ${theme.palette.stroke}`,
    borderRadius: 4,
    padding: 8,
  },
  forecastDataTitle: {
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  forecastDataItem: {
    fontSize: '0.85rem',
    marginBottom: 0,
    lineHeight: '8px',
  },
  forecastDataItemLabel: {
    fontSize: '0.75rem',
    color: theme.palette.stroke,
  },
});

const useStyles = makeStyles(styles);

const DashboardData = (props) => {
  const classes = useStyles();
  const { tabs, chartData, chartVariance, handleTabChange, tabIndex } = props;

  const [yconfig] = useState({});
  const [activeSwitchTab, setActiveSwitchTab] = useState('linechart');
  const [dataFilters, setDataFilters] = useState({
    fiscal_quarters: fiscalCalendar.activeQuarter,
    fiscal_months: fiscalCalendar.activeMonth,
    frequency: fiscalCalendar.activeFrequency,
  });

  const handleSwitch = (_, newAlignment) => {
    setActiveSwitchTab(newAlignment);
  };

  const handleChange = (_, newValue) => {
    handleTabChange(newValue);
  };

  const handleOnSelect = ({ selectedItems, type }) => {
    const filters = dataFilters;
    dataFilters[type] = selectedItems;
    setDataFilters(filters);
  };

  const xaxis = {
    title: '',
    categories: ['Apr W1', 'Apr W2', 'Apr W3', 'Apr W4', 'Mar W5'],
    plotLines: [
      {
        color: '#e9e9e9',
        width: 1,
        value: 0,
      },
    ],
  };

  const yaxis = {
    title: tabs[tabIndex]?.label,
    tickAmount: 5,
    categories: yconfig.categories,
  };

  return (
    <div>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        className={classes.header}
      >
        <Grid container>
          <Grid item xs={3} xl={4} display={'flex'} alignItems={'center'}>
            <p className={classes.title}>B&M + EComm - Carters - Baby c...</p>
          </Grid>
          <Grid
            item
            xs={9}
            xl={8}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <SimpleTabs
              items={tabs}
              value={tabIndex}
              handleChange={handleChange}
            />
          </Grid>
        </Grid>
      </Box>
      <div className={classes.body}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={4}
            xl={3}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <div className={classes.fiscalFilters}>
              <SelectRenderer
                options={fiscalCalendar.fiscalQuarters}
                selectedItems={dataFilters.fiscal_quarters}
                isMandatory={false}
                isMulti={false}
                filterLabel={''}
                placeholder={'F.Quarters'}
                type={'fiscal_quarters'}
                width={112}
                updateSelected={handleOnSelect}
              />
              <SelectRenderer
                options={fiscalCalendar.fiscalMonths}
                selectedItems={dataFilters.fiscal_months}
                isMandatory={false}
                isMulti={false}
                filterLabel={''}
                placeholder={'F.Months'}
                type={'fiscal_months'}
                width={112}
                updateSelected={handleOnSelect}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3.8}
            xl={4}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <div className={classes.fiscalDates}>
              <p className={classes.fiscalDateText}>01/02/2022 - 07/09/2022</p>
              <CalendarMonthOutlinedIcon className={classes.fiscalDateIcon} />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            xl={4}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <SelectRenderer
              options={fiscalCalendar.frequencyOptions}
              selectedItems={dataFilters.frequency}
              isMandatory={false}
              isMulti={false}
              filterLabel={''}
              placeholder={'Frequency'}
              type={'frequency'}
              width={112}
              updateSelected={handleOnSelect}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={1.2}
            xl={1}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <CustomToggleButtonGroup
              value={activeSwitchTab}
              handleSwitch={handleSwitch}
              borderRadius={8}
            >
              <ToggleButton
                value={'linechart'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                <TimelineOutlined />
              </ToggleButton>
              <ToggleButton
                value={'barchart'}
                aria-label='left aligned'
                classes={{
                  root: classes.toggleRoot,
                  selected: classes.toggleActive,
                }}
              >
                <BarChartOutlined />
              </ToggleButton>
            </CustomToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.data}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={8.5} lg={9}>
                  <Chart
                    chartType={activeSwitchTab}
                    data={
                      chartData?.[tabs[tabIndex]?.id] &&
                      _.isEmpty(chartData?.[tabs[tabIndex]?.id])
                        ? [{ data: [null, null, null] }]
                        : chartData?.[tabs[tabIndex]?.id]
                    }
                    xaxis={xaxis}
                    yaxis={yaxis}
                    showLegend={true}
                    height='320px'
                  />
                </Grid>
                <Grid item xs={12} md={3.5} lg={3}>
                  <div className={classes.forecastData}>
                    <p className={classes.forecastDataTitle}>Plan</p>
                    <p className={classes.forecastDataItem}>
                      {' '}
                      {!_.isEmpty(chartVariance) &&
                        chartVariance[tabs[tabIndex]?.id]?.planned}
                    </p>
                    <p className={classes.forecastDataTitle}>
                      PriceSmart Forecast
                    </p>
                    <p className={classes.forecastDataItem}>
                      {!_.isEmpty(chartVariance) &&
                        chartVariance[tabs[tabIndex]?.id]?.current_forecast}
                    </p>
                    <span className={classes.forecastDataItemLabel}>
                      Current
                    </span>
                    <p className={classes.forecastDataItem}>
                      {!_.isEmpty(chartVariance) &&
                        chartVariance[tabs[tabIndex]?.id]?.ia_recommendation}
                    </p>
                    <span className={classes.forecastDataItemLabel}>
                      IA Recommended
                    </span>
                    <p className={classes.forecastDataItem}>
                      {!_.isEmpty(chartVariance) &&
                        chartVariance[tabs[tabIndex]?.id]?.final_forecast}
                    </p>
                    <span className={classes.forecastDataItemLabel}>
                      Finalized
                    </span>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardData;
