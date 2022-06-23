import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { Grid } from '@mui/material';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomButton from '../../components/CustomButton';
import CustomCard from '../../components/CustomCard';
import { treeMapData, treeMapMetrics } from '../Components/data';
import DashboardData from './DashboardData';
import Chart from '../../utils/charts/Chart';
import { filtersList } from './data';
import { UserContext } from '../../App';
import { Box } from '@mui/system';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import DataLabels from '../../components/DataLabels';
import DataCard from '../../components/DataCard';
import SimpleTabs from '../../components/SimpleTabs';
import CustomRadioGroup from '../../components/CustomRadioGroup';
import ArrowDownwardRounded from '@mui/icons-material/ArrowDownwardRounded';

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

const FilterOne = (props) => {
  const user = useContext(UserContext);
  const classes = useStyles();

  const setSelected = (items) => {
    console.log('Items', items);
  };

  const handleDrilldown = (item) => {
    console.log(item);
    // Add new filter - Optional to add to actual filter
    // New filter mimic same action as filter selection (redux) - optional
    // Call the API again with new filter - get filter from saved filters and add any new params

    // Get aggregate value from currently selectedHierarchy
    // Get hierarchy options from last saved filters and config down to CT
    // setTreemapExtraFilter(extraFilters);

    // Add extra filters to last saved filters and make API call to get new itemSummary
  };

  const tooltip = {
    enable: true,
    useHtml: true,
    formatter: function (tooltipData) {
      // Find the current item in other metrics and add to variance object
      const variance = {};
      if (tooltipData && tooltipData.id) {
        const itemId = tooltipData.id;
        treeMapData.map((metric) => {
          const currentItem = metric.items.find((item) => item.id === itemId);
          if (currentItem && !_.isEmpty(currentItem.variance)) {
            let actual = currentItem.variance.find((v) =>
              v.variance_type.includes('actual')
            );
            let recommended = currentItem.variance.find((v) =>
              v.variance_type.includes('ia_recommendation')
            );
            let finalized = currentItem.variance.find((v) =>
              v.variance_type.includes('final_forecast')
            );

            variance[metric.metric_name] = {
              current: actual && actual.value,
              recommended: recommended && recommended.value,
              finalized: finalized && finalized.value,
            };
          }
        });
      }
      let tableData = '';
      for (const [key, value] of Object.entries(variance)) {
        let displayName =
          treeMapMetrics &&
          !_.isEmpty(treeMapMetrics) &&
          treeMapMetrics.filter((metric) => metric.key === key);
        displayName =
          displayName && displayName.length ? displayName[0].display : key;
        tableData +=
          '<tr> <td>' +
          displayName +
          ' </td>' +
          '<td>' +
          (value.current ? value.current + '%' : '-') +
          '</td>' +
          '<td>' +
          (value.recommended ? value.recommended + '%' : '-') +
          '</td>' +
          '<td>' +
          (value.finalized ? value.finalized + '%' : '-') +
          '</td> </tr>';
      }

      return (
        "<table class='treemap-hover-table'>" +
        '<tr> <th></th>' +
        '<th>Current  </th>' +
        '<th>Recommended  </th>' +
        '<th>Finalized  </th> </tr>' +
        tableData +
        '</table>'
      );
    },
  };

  const {
    configData,
    dataLabels,
    dataCardValues,
    chartTitle,
    dates,
    data,
    tabs,
    tabIndex,
    mapSwitches,
    chartSwitches,
    activeMapSwitch,
    setDates,
    handleMapTypeChange,
    handleTabChange,
    handleOnSelect,
  } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9} xl={9.5}>
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
          <div style={{ padding: '0 16px' }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                padding: '32px 40px',
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
                <Grid item xs={4} display={'flex'} justifyContent={'center'}>
                  {mapSwitches?.length > 0 ? (
                    <CustomRadioGroup
                      options={mapSwitches}
                      row={true}
                      value={activeMapSwitch}
                      handleChange={handleMapTypeChange}
                    />
                  ) : null}
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'flex-end'}>
                  <CustomButton
                    isPrimary={false}
                    variant='outlined'
                    height={32}
                    width={32}
                    minWidth={0}
                    padding={'16px'}
                    label=''
                    startIcon={
                      <ArrowDownwardRounded className={classes.iconButton} />
                    }
                    startIconClass={classes.startIcon}
                    onButtonClick={() => console.log('1')}
                  />
                </Grid>
              </Grid>
            </Box>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  margin: 8,
                  width: 840,
                  padding: 32,
                }}
              >
                <Chart
                  user={user}
                  tableCells={configData[0]?.['Chart Data']}
                  chartType='treemap'
                  drilldown={true}
                  select={true}
                  height='360px'
                  data={
                    treeMapData.find(
                      (data) => data.metric_name === 'gross_margin'
                    )
                      ? treeMapData.find(
                          (data) => data.metric_name === 'gross_margin'
                        ).items
                      : []
                  }
                  tooltip={tooltip}
                  setSelectedItems={(items) => setSelected(items)}
                  handleDrilldown={(selectedItem) =>
                    handleDrilldown(selectedItem)
                  }
                  seriesName='SBU'
                />
              </div>
              <div>
                <p className={classes.legend}>
                  <span className={classes.legendMarker1}></span> On Track
                </p>
                <p className={classes.legend}>
                  <span className={classes.legendMarker2}></span> Over Achieving
                </p>
                <p className={classes.legend}>
                  <span className={classes.legendMarker3}></span> Under
                  Achieving
                </p>
              </div>
            </div>
          </div>
        </CustomCard>
      </Grid>
      <Grid item xs={12}>
        <CustomCard cardStyles={classes.headerCard}>
          <DashboardData
            chartData={data}
            title={chartTitle}
            switches={chartSwitches}
          />
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default FilterOne;
