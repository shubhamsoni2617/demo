import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, ToggleButton } from '@mui/material';
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import CustomButton from '../components/CustomButton';
import CustomToggleButtonGroup from '../components/CustomToggleButtonGroup';
import { GetProductPerformance } from '../services/productInfo';
import { GetPerformanceChartData } from '../services/chart';

import { Table } from '../components/Table';
import { performanceTableConfig } from '../pages/ExecutiveSummary/config';
import CustomRadioGroup from '../components/CustomRadioGroup';
import { productPerformanceOptions } from '../pages/ExecutiveSummary/data';
import Chart from '../utils/charts/Chart';
import { theme } from '../theme';

const styles = (theme) => ({
  loaderContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    width: '100%',
    height: '100%',
    padding: 40,
  },
  loader: {
    color: theme.palette.bgSwitch,
  },
  container: {
    padding: 40,
  },
  actions: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    width: '100%',
  },
  switchTab: {
    border: `1px solid ${theme.palette.strokeTab}`,
    borderRadius: '4px !important',
  },
  toggleRoot: {
    padding: '6px 16px',
    borderRight: `1px solid ${theme.palette.strokeTab} !important`,
    background: theme.palette.textWhite,
    color: `${theme.palette.textDark}`,
    border: 'none',

    '& .MuiTouchRipple-root': {
      borderRight: `1px solid ${theme.palette.strokeTab} !important`,
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
    margin: -1,
    background: `${theme.palette.bgSwitch} !important`,
    color: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
  switchTabText: {
    color: 'inherit',
    textTransform: 'capitalize',
    margin: 0,
  },
  switches: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    width: '100%',
  },
  iconButton: {
    fontSize: '24px !important',
    color: theme.palette.bgSwitch,
  },
  startIcon: {
    display: 'inherit',
    margin: 0,
  },
  chartContainer: {
    margin: '32px 0',
  },
  chart: {
    marginBottom: '24px',
  },
});

const performanceColors = {
  Planned: theme.palette.textPrimary,
  Actual: theme.palette.bgSwitch,
  Forecasted: theme.palette.bgDanger,
};

const performanceStepsColors = {
  '30%(Actual)': theme.palette.stroke,
  '30%': theme.palette.bgSwitch,
  '40%': theme.palette.textPrimary,
  '50%': theme.palette.bgChartSuccess,
};

const useStyles = makeStyles(styles);

const ProductGroupPerformance = ({ data }) => {
  const classes = useStyles();

  const [activeSwitchTab, setActiveSwitchTab] = useState('st');
  const [performanceType, setPerformanceType] = useState('plan_level');
  const [sellThroughPerformance, setSellThroughPerformance] = useState([]);
  const [sellThroughStepsPerformance, setSellThroughStepsPerformance] =
    useState([]);

  const handleSwitch = (_, newAlignment) => {
    setActiveSwitchTab(newAlignment);
  };

  const handlePerformanceTypeChange = (e) => {
    setPerformanceType(e.target.value);
  };

  const {
    isLoading: isLoadingPerformance,
    data: productPerformance,
    refetch: refetchProductPerformance,
    isFetching: isFetchingPerformance,
  } = GetProductPerformance({
    product_id: data.id % 5 === 0 ? 5 : data.id % 5,
  });

  const {
    isLoading: isLoadingPerformanceChartData,
    data: productPerformanceChartData,
    refetch: refetchProductPerformanceChartData,
    isFetching: isFetchingPerformanceChartData,
  } = GetPerformanceChartData({
    product_id: data.id % 5 === 0 ? 5 : data.id % 5,
    state: 0,
  });

  useEffect(() => {
    if (data && data.id) {
      refetchProductPerformance();
      refetchProductPerformanceChartData();
    }
  }, [data]);

  useEffect(() => {
    if (productPerformanceChartData) {
      const sellThroughPerformance = [];
      const sellThroughPerformanceObj = {};
      const sellThroughStepsPerformance = [];
      const sellThroughStepsPerformanceObj = {};

      productPerformanceChartData?.sell_through_table?.forEach((item) => {
        if (!sellThroughPerformanceObj[item.label_id]) {
          sellThroughPerformanceObj[item.label_id] = {
            id: item.label_id,
            name: item.name,
            dashStyle: item.futuristic_value ? 'Dash' : 'Solid',
            color: performanceColors[item.label_id],
            data: [item.value],
          };
        } else {
          sellThroughPerformanceObj[item.label_id].data.push(item.value);
        }
      });

      Object.keys(sellThroughPerformanceObj)?.forEach((key) => {
        sellThroughPerformance.push(sellThroughPerformanceObj[key]);
      });

      productPerformanceChartData?.sell_through_steps?.forEach((item) => {
        if (!sellThroughStepsPerformanceObj[item.label_id]) {
          sellThroughStepsPerformanceObj[item.label_id] = {
            id: item.label_id,
            name: item.name,
            dashStyle: item.futuristic_value ? 'Dash' : 'Solid',
            color: performanceStepsColors[item.label_id],
            data: [item.value],
          };
        } else {
          sellThroughStepsPerformanceObj[item.label_id].data.push(item.value);
        }
      });

      Object.keys(sellThroughStepsPerformanceObj)?.forEach((key) => {
        sellThroughStepsPerformance.push(sellThroughStepsPerformanceObj[key]);
      });

      setSellThroughPerformance([...sellThroughPerformance]);
      setSellThroughStepsPerformance([...sellThroughStepsPerformance]);
    }
  }, [productPerformanceChartData]);

  const xaxisLine = {
    title: 'Time Period',
    categories: [
      'Aug 04',
      'Aug 11',
      'Aug 18',
      'Aug 25',
      'Sep 01',
      'Sep 08',
      'Sep 15',
      'Sep 22',
      'Sep 29',
      'Oct 06',
      'Oct 13',
      'Oct 20',
    ],
  };

  const yaxisLine = {
    title: 'ST%',
    tickAmount: 6,
  };

  const xaxisStep = {
    categories: [
      'Aug 04',
      'Aug 11',
      'Aug 18',
      'Aug 25',
      'Sep 01',
      'Sep 08',
      'Sep 15',
      'Sep 22',
      'Sep 29',
      'Oct 06',
      'Oct 13',
      'Oct 20',
    ],
  };

  const yaxisStep = {
    title: 'ST%',
    tickAmount: 6,
    minRange: 100,
  };

  return (
    <div>
      {isLoadingPerformance ||
      isLoadingPerformanceChartData ||
      isFetchingPerformance ||
      isFetchingPerformanceChartData ? (
        <div className={classes.loaderContainer}>
          <CircularProgress className={classes.loader} />
        </div>
      ) : (
        <div className={classes.container}>
          <div className={classes.actions}>
            <div className={classes.switches}>
              <CustomToggleButtonGroup
                value={activeSwitchTab}
                handleSwitch={handleSwitch}
                borderRadius={8}
                customClasses={{
                  tab: classes.switchTab,
                }}
              >
                <ToggleButton
                  value={'sales'}
                  aria-label='left aligned'
                  classes={{
                    root: classes.toggleRoot,
                    selected: classes.toggleActive,
                  }}
                >
                  <p className={classes.switchTabText}>Sales</p>
                </ToggleButton>
                <ToggleButton
                  value={'margin'}
                  aria-label='left aligned'
                  classes={{
                    root: classes.toggleRoot,
                    selected: classes.toggleActive,
                  }}
                >
                  <p className={classes.switchTabText}>Margin</p>
                </ToggleButton>
                <ToggleButton
                  value={'st'}
                  aria-label='left aligned'
                  classes={{
                    root: classes.toggleRootLast,
                    selected: classes.toggleActive,
                  }}
                >
                  <p className={classes.switchTabText}>ST%</p>
                </ToggleButton>
              </CustomToggleButtonGroup>
            </div>
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={
                <AutoGraphOutlinedIcon className={classes.iconButton} />
              }
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('Cool')}
            />
          </div>
          <div className={classes.chartContainer}>
            {sellThroughPerformance?.length > 0 && (
              <div className={classes.chart}>
                <Chart
                  chartType={'linechart-performance'}
                  data={sellThroughPerformance}
                  xaxis={xaxisLine}
                  yaxis={yaxisLine}
                  title={'Sell Through%'}
                  showLegend={true}
                  height='350px'
                />
              </div>
            )}
            {sellThroughStepsPerformance?.length > 0 && (
              <div className={classes.chart}>
                <Chart
                  chartType={'step'}
                  data={sellThroughStepsPerformance}
                  xaxis={xaxisStep}
                  yaxis={yaxisStep}
                  title={'Sell Through'}
                  showLegend={true}
                  height='350px'
                />
              </div>
            )}
          </div>
          <div>
            <CustomRadioGroup
              label={''}
              options={productPerformanceOptions}
              value={performanceType}
              handleChange={handlePerformanceTypeChange}
              row={true}
            />

            {productPerformance && (
              <Table
                rowData={productPerformance[performanceType]}
                columnDefs={performanceTableConfig[performanceType]}
                pagination={false}
                floatingFilter={false}
                height={
                  performanceType === 'plan_level'
                    ? 114
                    : performanceType === 'plan_week'
                    ? 220
                    : performanceType === 'store_week'
                    ? 384
                    : 438
                }
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGroupPerformance;
