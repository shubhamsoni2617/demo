import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { Grid } from '@mui/material';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomButton from '../../components/CustomButton';
import CustomCard from '../../components/CustomCard';
import { tabs } from '../Components/data';
import DashboardData from './DashboardData';
import { chartSwitches, filtersList, mapSwitches } from './data';
import { Box } from '@mui/system';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import DataLabels from '../../components/DataLabels';
import DataCard from '../../components/DataCard';
import SimpleTabs from '../../components/SimpleTabs';
import CustomRadioGroup from '../../components/CustomRadioGroup';
import LoadingOverlay from '../../components/LoadingOverlay';

import { GetProductDetails } from '../../services/productInfo';
import {
  GetCategoriesTreemap,
  GetSubCategoriesTreemap,
} from '../../services/treemap';
import { transformToTreemap } from '../../utils';
import Treemap from '../../components/Treemap';

import DownloadIcon from '../../assets/svg/download.svg';
import { GetChartData } from '../../services/chart';
import DashboardTable from '../../molecules/DashboardTable';
import { GetProductGroups } from '../../services/table';

const styles = (theme) => ({
  title: {
    margin: '30px 10px 10px 10px',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: theme.typography.fontWeight.normal,
  },
  headerCardActive: {
    ...theme.content.card,
    width: '100%',
    height: '100%',
    overflow: theme.content.overflow.visible,
    border: `1px solid ${theme.palette.strokeLightBlue}`,
  },
  headerCardMetricsActive: {
    ...theme.content.card,
    width: '100%',
    height: '100%',
    overflow: theme.content.overflow.visible,
    cursor: theme.content.cursor.pointer,
    border: `1px solid ${theme.palette.strokeLightBlue}`,
  },
  headerCardMetrics: {
    ...theme.content.card,
    width: '100%',
    height: '100%',
    cursor: theme.content.cursor.pointer,
    overflow: theme.content.overflow.visible,
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
  treeMapContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
  },
  legendContainer: {
    ...theme.content.flexStyles.flexCol,
    ...theme.content.flexStyles.flexAlignCenterStart,
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
  finalizeButtonContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    padding: '8px 0 24px 0',
  },
});

const useStyles = makeStyles(styles);

const colors = {
  Planned: '#F49125',
  Actual: '#65A0EF',
  Forecasted: '#8373FF',
};

const FilterOne = (props) => {
  const classes = useStyles();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get('category_id');
  const subCategoryId = searchParams.get('sub_category_id');
  const state = !categoryId ? 0 : searchParams.get('state');

  const [dates, setDates] = useState([new Date(), new Date()]);
  const [productLabels, setProductLabels] = useState([]);
  const [productMetrics, setProductMetrics] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [activeMapSwitch, setActiveMapSwitch] = useState('ltd');
  const [activeMetrics, setActiveMetrics] = useState('revenue');
  const [treemapData, setTreemapData] = useState(null);
  const [selectedTreemap, setSelectedTreemap] = useState([]);
  const [chartData, setChartData] = useState(null);

  const selectTreemapByMetrics = (data, metricType) => {
    let filteredTreemapData = data[metricType];
    filteredTreemapData = transformToTreemap(filteredTreemapData, 420, 700);
    setSelectedTreemap(filteredTreemapData);
  };

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  const handleMapTypeChange = (e) => {
    setActiveMapSwitch(e.target.value);
  };

  const handleMetricsChange = (value) => {
    if (state < 3) {
      selectTreemapByMetrics(treemapData, value);
      setActiveMetrics(value);
    }
  };

  const handleMapItemClick = (state, categoryId, subCategoryId) => {
    let searchParams;

    if (subCategoryId) {
      searchParams = new URLSearchParams({
        code: 0,
        state: state + 1,
        category_id: categoryId,
        sub_category_id: subCategoryId,
      });
    } else {
      searchParams = new URLSearchParams({
        code: 0,
        state: state + 1,
        category_id: categoryId,
      });
    }

    setSearchParams(searchParams);
  };

  const showFinalizeButton = (data) => {
    const isSelectable = data[activeMetrics]?.some(
      (item) => item.is_selectable
    );
    return isSelectable;
  };

  const {
    isLoading: isLoadingProductLabels,
    data: productDetails,
    refetch: refetchProductLabels,
    // isFetching,
  } = GetProductDetails({ state });

  const {
    isLoading: isLoadingCategoriesTreeMap,
    data: categoriesTreemap,
    refetch: refetchCategoriesTreemap,
    // isFetching,
  } = GetCategoriesTreemap();

  const {
    isLoading: isLoadingSubCategoriesTreeMap,
    data: subCategoriesTreemap,
    refetch: refetchSubCategoriesTreemap,
    // isFetching,
  } = GetSubCategoriesTreemap({ state });

  const {
    isLoading: isLoadingProductGroups,
    data: productGroups,
    refetch: refetchProductGroups,
    // isFetching,
  } = GetProductGroups({ state });

  const {
    isLoading: isLoadingChartData,
    data: chart,
    refetch: refetchChartData,
    // isFetching,
  } = GetChartData();

  const { appliedFilters, handleOnSelect } = props;

  useEffect(() => {
    if (appliedFilters && Object.keys(appliedFilters).length > 0) {
      refetchProductLabels();

      if (!categoryId) {
        refetchCategoriesTreemap();
      } else if (categoryId && !subCategoryId) {
        refetchSubCategoriesTreemap();
      } else {
        refetchProductGroups();
      }

      refetchChartData();

      if (state > 2) {
        setActiveMetrics(null);
      }
    }
  }, [appliedFilters, state, categoryId]);

  useEffect(() => {
    if (productDetails?.product_labels?.length > 0) {
      const productLabels = productDetails?.product_labels;
      const productMetrics = productDetails?.product_metrics;

      setProductLabels([...productLabels]);
      setProductMetrics([...productMetrics]);
    }
  }, [productDetails]);

  useEffect(() => {
    if (categoriesTreemap && Object.keys(categoriesTreemap).length > 0) {
      setTreemapData(categoriesTreemap);
      selectTreemapByMetrics(categoriesTreemap, 'revenue');
    }
  }, [categoriesTreemap]);

  useEffect(() => {
    if (subCategoriesTreemap && Object.keys(subCategoriesTreemap).length > 0) {
      setTreemapData(subCategoriesTreemap);
      selectTreemapByMetrics(subCategoriesTreemap, 'revenue');
    }
  }, [subCategoriesTreemap]);

  useEffect(() => {
    if (chart && Object.keys(chart).length > 0) {
      const chartDataObj = {};

      Object.keys(chart)?.forEach((key) => {
        if (!chartDataObj[key]) {
          chartDataObj[key] = {};
        }

        chart[key].forEach((data) => {
          if (!chartDataObj[key][data.label]) {
            chartDataObj[key][data.label] = {
              id: data.label,
              name: data.label,
              data: [Number(data.value)],
              visible: data.is_visible,
              color: colors[data.label],
              dashStyle: data.futuristic_value ? 'Dash' : 'Solid',
            };
          } else {
            chartDataObj[key][data.label].data.push(Number(data.value));
          }
        });
      });

      Object.keys(chartDataObj).forEach((key) => {
        const currentObj = { ...chartDataObj[key] };
        const dataArray = [];

        Object.keys(currentObj).forEach((dataKey, index) => {
          dataArray.push(currentObj[dataKey]);
        });

        chartDataObj[key] = dataArray;
      });

      setChartData(chartDataObj);
    }
  }, [chart]);

  return (
    <div>
      {isLoadingProductLabels ||
      isLoadingCategoriesTreeMap ||
      isLoadingSubCategoriesTreeMap ||
      isLoadingProductGroups ||
      isLoadingChartData ? (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            zIndex: 999,
          }}
        >
          <LoadingOverlay
            loader
            text='Fetching Data'
            position='absolute'
            background='rgba(255,255,255,0.8)'
            // color='#fff'
          />
        </div>
      ) : null}
      <Grid container spacing={2}>
        {productLabels?.length > 0 && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9} xl={9.5}>
                <CustomCard cardStyles={classes.headerCard} fullHeight={true}>
                  <div
                    className={classes.container}
                    style={{
                      borderRadius: 4,
                    }}
                  >
                    {productLabels?.map((productLabel, index) => (
                      <DataLabels
                        key={productLabel.id}
                        label={productLabel.label}
                        value={productLabel.value}
                        isLast={index === productLabels.length - 1}
                      />
                    ))}
                  </div>
                </CustomCard>
              </Grid>
              <Grid item xs={12} md={3} xl={2.5}>
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
        )}

        <Grid item xs={12}>
          <Grid container spacing={3}>
            {productMetrics?.map((metric, metricIndex) => (
              <Grid item xs={12} md={3} key={`data-card-${metricIndex}`}>
                <CustomCard
                  cardStyles={
                    metric.type === activeMetrics
                      ? classes.headerCardMetricsActive
                      : classes.headerCardMetrics
                  }
                >
                  <DataCard data={metric} onClick={handleMetricsChange} />
                </CustomCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {productLabels?.length > 0 && (
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
        )}

        {selectedTreemap?.length > 0 && state < 3 ? (
          <Grid item xs={12}>
            <CustomCard cardStyles={classes.headerCard}>
              <div style={{ padding: '0 16px' }}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    padding: '20px 40px',
                  }}
                >
                  <Grid container>
                    <Grid item xs={4}>
                      <div className={classes.headerBox}>
                        <p className={classes.selectTitle}>View By</p>

                        <SelectRenderer
                          options={filtersList}
                          selectedItems={[]}
                          isMandatory={false}
                          isMulti={false}
                          filterLabel={''}
                          type={'abc'}
                          width={180}
                          updateSelected={handleOnSelect}
                        />
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      {mapSwitches?.length > 0 ? (
                        <CustomRadioGroup
                          options={mapSwitches}
                          row={true}
                          value={activeMapSwitch}
                          handleChange={handleMapTypeChange}
                        />
                      ) : null}
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      display={'flex'}
                      justifyContent={'flex-end'}
                    >
                      <CustomButton
                        isPrimary={false}
                        variant='outlined'
                        height={32}
                        width={32}
                        minWidth={0}
                        padding={'16px'}
                        label=''
                        startIcon={
                          <img
                            src={DownloadIcon}
                            alt='download'
                            className={classes.iconButton}
                          />
                        }
                        startIconClass={classes.startIcon}
                        onButtonClick={() => console.log('1')}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <div className={classes.treeMapContainer}>
                  <div>
                    <Treemap
                      data={selectedTreemap}
                      state={state || 0}
                      categoryId={categoryId}
                      height={432}
                      width={700}
                      handleMapItemClick={handleMapItemClick}
                    />
                  </div>
                  <div className={classes.legendContainer}>
                    <p className={classes.legend}>
                      <span className={classes.legendMarker1}></span> On Track
                    </p>
                    <p className={classes.legend}>
                      <span className={classes.legendMarker2}></span> Selling
                      Fast
                    </p>
                    <p className={classes.legend}>
                      <span className={classes.legendMarker3}></span> Selling
                      Slow
                    </p>
                  </div>
                </div>
                {showFinalizeButton(treemapData) && (
                  <div className={classes.finalizeButtonContainer}>
                    <CustomButton
                      isPrimary={true}
                      variant='contained'
                      height={36}
                      width={220}
                      label='Finalize'
                      onButtonClick={() =>
                        parseInt(state) < 2 &&
                        handleMapItemClick(parseInt(state), categoryId)
                      }
                    />
                  </div>
                )}
              </div>
            </CustomCard>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <CustomCard cardStyles={classes.headerCard}>
              <DashboardTable
                data={productGroups}
                state={state}
                categoryId={categoryId}
                subCategoryId={subCategoryId}
                finalize={handleMapItemClick}
              />
            </CustomCard>
          </Grid>
        )}

        {parseInt(state) < 3 && (
          <Grid item xs={12}>
            <CustomCard cardStyles={classes.headerCard}>
              <DashboardData
                chartData={chartData}
                title={'Sales Performance'}
                switches={chartSwitches}
              />
            </CustomCard>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default FilterOne;
