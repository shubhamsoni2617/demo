import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Switch } from '@mui/material';

import { GetInventoryDetails } from '../services/inventory';
import { GetDiscountDetails } from '../services/discounts';
import { GetSimulationResults } from '../services/simulation';
import Inventory from './Inventory';
import Strategy from './Strategy';
import Discounts from './Discounts';
import SimulationTable from './SimulationTable';
import CustomButton from '../components/CustomButton';
import PromoCharts from './PromoCharts';
import { GetPerformanceOptimizationChartData } from '../services/chart';
import { scenarioOneData } from '../pages/ExecutiveSummary/chartData';
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
  cadenceContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    margin: 24,
  },
  editContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    padding: '16px 40px',
    borderBottom: `2px dashed ${theme.palette.strokeLightBlue}`,
  },
  switchContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  switchLabel: {
    ...theme.typography.fontSizes.linkText,
    margin: 0,
    marginBottom: 4,
  },
  switchLabelActive: {
    ...theme.typography.fontSizes.linkText,
    color: theme.palette.bgSwitch,
    fontWeight: theme.typography.fontWeight.semiBold,
    margin: 0,
    marginBottom: 4,
  },
  header: {
    ...theme.typography.fontSizes.unitText,
    fontWeight: theme.typography.fontWeight.bold,
    marginRight: 24,
  },
  switchRoot: {
    width: 64,
    height: 44,

    '& .Mui-checked+.MuiSwitch-track': {
      border: `1px solid ${theme.palette.textPrimary} !important`,
    },
  },
  switchBase: {
    transform: 'translate(6px, 5.5px)',
  },
  switchChecked: {
    transform: 'translate(26px,5.5px) !important',

    '& .MuiSwitch-thumb': {
      background: theme.palette.textPrimary,
    },
  },
  switchThumb: {
    height: 14,
    width: 14,
    background: theme.palette.bgSwitch,
    boxShadow: 'none',
  },
  switchTrack: {
    height: 19,
    borderRadius: 21,
    border: '1px solid',
    background: `${theme.palette.textWhite} !important`,
  },
});

const performanceStepsColors = {
  '30%(Actual)': theme.palette.stroke,
  '30%': theme.palette.bgSwitch,
  '40%': theme.palette.textPrimary,
  '50%': theme.palette.bgChartSuccess,
  '30%(Scenario 01)': theme.palette.bgSwitch,
  '40%(Scenario 01)': theme.palette.textPrimary,
  '50%(Scenario 01)': theme.palette.bgChartSuccess,
};

const useStyles = makeStyles(styles);

const ProductPromo = ({ data }) => {
  const classes = useStyles();

  const [isReoptimizing, setIsReoptimizing] = useState(false);
  const [state, setState] = useState(0);
  const [marginData, setMarginData] = useState([]);
  const [sellThroughData, setSellThroughData] = useState([]);

  const handleSwitchChange = (event) => {
    if (event.target.checked) {
      setState(1);
    } else {
      setState(0);
    }
    setIsReoptimizing(event.target.checked);
  };

  const {
    isLoading: isLoadingInventoryDetails,
    data: inventoryDetails,
    refetch: refetchInventoryDetails,
    isFetching: isFetchingInventoryDetails,
  } = GetInventoryDetails({
    product_id: data.id % 5 === 0 ? 5 : data.id % 5,
  });

  const {
    isLoading: isLoadingDiscountDetails,
    data: discountDetails,
    refetch: refetchDiscountDetails,
    isFetching: isFetchingDiscountDetails,
  } = GetDiscountDetails({
    product_id: data.id % 5 === 0 ? 5 : data.id % 5,
  });

  const {
    isLoading: isLoadingSimulationResults,
    data: simulationResults,
    refetch: refetchSimulationResults,
    isFetching: isFetchingSimulationResults,
  } = GetSimulationResults({
    product_id: data.id % 5 === 0 ? 5 : data.id % 5,
    state,
  });

  const {
    isLoading: isLoadingPerformanceOptimizationChartData,
    data: productPerformanceOptimizationChartData,
    refetch: refetchProductPerformanceOptimizationChartData,
    isFetching: isFetchingPerformanceOptimizationChartData,
  } = GetPerformanceOptimizationChartData({
    state: parseInt(state),
  });

  useEffect(() => {
    if (productPerformanceOptimizationChartData) {
      let marginPerformance = [];
      const marginPerformanceObj = {};
      let sellThroughStepsPerformance = [];
      const sellThroughStepsPerformanceObj = {};

      productPerformanceOptimizationChartData?.margin_chart?.forEach((item) => {
        if (!marginPerformanceObj[item.label_id]) {
          marginPerformanceObj[item.label_id] = {
            id: item.label_id,
            name: item.name,
            dashStyle: item.futuristic_value ? 'Dash' : 'Solid',
            color: performanceStepsColors[item.label_id],
            type: item.type,
            data: [item.value],
          };
        } else {
          marginPerformanceObj[item.label_id].data.push(item.value);
        }
      });

      Object.keys(marginPerformanceObj)?.forEach((key) => {
        marginPerformance.push(marginPerformanceObj[key]);
      });

      productPerformanceOptimizationChartData?.sell_through_steps?.forEach(
        (item) => {
          if (!sellThroughStepsPerformanceObj[item.label_id]) {
            sellThroughStepsPerformanceObj[item.label_id] = {
              id: item.label_id,
              name: item.name,
              dashStyle: item.futuristic_value ? 'Dash' : 'Solid',
              color: performanceStepsColors[item.label_id],
              type: item.type,
              data: [item.value],
            };
          } else {
            sellThroughStepsPerformanceObj[item.label_id].data.push(item.value);
          }
        }
      );

      Object.keys(sellThroughStepsPerformanceObj)?.forEach((key) => {
        sellThroughStepsPerformance.push(sellThroughStepsPerformanceObj[key]);
      });

      if (state === 1) {
        marginPerformance = [...marginPerformance, ...scenarioOneData];
        sellThroughStepsPerformance = [
          ...sellThroughStepsPerformance,
          ...scenarioOneData,
        ];
      }

      setMarginData([...marginPerformance]);
      setSellThroughData([...sellThroughStepsPerformance]);
    }
  }, [productPerformanceOptimizationChartData]);

  useEffect(() => {
    if (data && data.id) {
      refetchInventoryDetails();
      refetchDiscountDetails();
      refetchSimulationResults();
    }
  }, [data]);

  useEffect(() => {
    refetchSimulationResults();
    refetchProductPerformanceOptimizationChartData();
  }, [state]);

  console.log({ sellThroughData });

  return (
    <div>
      {isLoadingInventoryDetails ||
      isLoadingDiscountDetails ||
      isLoadingSimulationResults ||
      isLoadingPerformanceOptimizationChartData ||
      isFetchingInventoryDetails ||
      isFetchingDiscountDetails ||
      isFetchingSimulationResults ||
      isFetchingPerformanceOptimizationChartData ? (
        <div className={classes.loaderContainer}>
          <CircularProgress className={classes.loader} />
        </div>
      ) : (
        <div>
          {inventoryDetails && (
            <div>
              <Inventory
                inventoryDetails={inventoryDetails}
                isReoptimizing={isReoptimizing}
              />
              <div className={classes.editContainer}>
                <p className={classes.header}>Edit By:</p>
                <div className={classes.switchContainer}>
                  <p
                    className={
                      isReoptimizing
                        ? classes.switchLabel
                        : classes.switchLabelActive
                    }
                  >
                    Simulate
                  </p>
                  <Switch
                    checked={isReoptimizing}
                    onChange={handleSwitchChange}
                    disableFocusRipple={true}
                    disableTouchRipple={true}
                    disableRipple={true}
                    classes={{
                      root: classes.switchRoot,
                      switchBase: classes.switchBase,
                      checked: classes.switchChecked,
                      thumb: classes.switchThumb,
                      track: classes.switchTrack,
                    }}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <p
                    className={
                      isReoptimizing
                        ? classes.switchLabelActive
                        : classes.switchLabel
                    }
                  >
                    Reoptimize
                  </p>
                </div>
              </div>
              <Strategy inventoryDetails={inventoryDetails} state={state} />
            </div>
          )}
          {discountDetails && (
            <div style={{ margin: '24px 0' }}>
              {state === 1 && (
                <div className={classes.cadenceContainer}>
                  <CustomButton
                    isPrimary={true}
                    variant='contained'
                    height={28}
                    width={180}
                    minWidth={0}
                    padding={'16px'}
                    label='Generate Cadence'
                    onButtonClick={() => console.log('Cadence')}
                  />
                </div>
              )}
              <Discounts discounts={discountDetails} state={state} />
              <PromoCharts
                title={state === 1 ? 'Scenario 01' : 'Planned'}
                marginData={marginData}
                sellThroughData={sellThroughData}
              />
            </div>
          )}
          {simulationResults && (
            <SimulationTable data={simulationResults} state={state} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductPromo;
