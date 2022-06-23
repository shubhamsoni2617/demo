import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomButton from '../../components/CustomButton';
import CustomCard from '../../components/CustomCard';
import CustomAccordion from '../../components/CustomAccordion';
import { colourOptions, treeMapData, treeMapMetrics } from '../Components/data';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import Refresh from '@mui/icons-material/Refresh';
import DashboardData from './DashboardData';
import VarianceData from './VarianceData';
import Chart from '../../utils/charts/Chart';
import { filtersList } from './data';
import { UserContext } from '../../App';
import axios from 'axios';
import DashboardTable from './DashboardTable';
import { Box } from '@mui/system';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import CheckboxGroup from '../../components/CheckboxGroup';

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
  headerBox: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  selectTitle: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.semiBold,
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

const DecisionDashboard = () => {
  const user = useContext(UserContext);

  const classes = useStyles();
  const [configData, setConfigData] = useState({});
  const [tabs, setTabs] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [data, setData] = useState(null);
  const [chartVariance, setChartVariance] = useState(null);
  const [varianceTableTitle, setVarianceTableTitle] = useState('');
  const [varianceConfig, setVarianceConfig] = useState([]);
  const [varianceData, setVarianceData] = useState([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filtersHeaderData, setFiltersHeaderData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleTabChange = (newValue) => {
    setTabIndex(newValue);
  };

  const handleOnSelect = ({ selectedItems, type }) => {
    selectedFilters[type] = selectedItems;

    if (selectedItems?.length === 0) {
      filtersHeaderData.forEach((filterHeader) => {
        if (
          (filterHeader.type === 'select' ||
            filterHeader.type === 'multi-select') &&
          filterHeader.index >= type
        ) {
          selectedFilters[filterHeader.index] = [];
        }
      });
    }

    setSelectedFilters([...selectedFilters]);
  };

  const handleDateChange = (value, index) => {
    selectedFilters[index] = value;

    setSelectedFilters([...selectedFilters]);
  };

  const handleDateRangeChange = (values, index) => {
    selectedFilters[index] = values;

    setSelectedFilters([...selectedFilters]);
  };

  const handleCheckboxChange = (e, index) => {
    const values = { ...selectedFilters[index] };
    values[e.target.name] = !values[e.target.name];

    selectedFilters[index] = { ...values };
    setSelectedFilters([...selectedFilters]);
  };

  const applyFilter = () => {
    console.log('Filters', selectedFilters);
  };

  const resetFilters = () => {
    let filters = [];

    filtersHeaderData.forEach((header) => {
      if (header.type === 'date') {
        filters.push(new Date());
      } else if (header.type === 'checkboxes') {
        const obj = {};

        header.fields.forEach((field) => {
          obj[field.value] = false;
        });

        filters.push(obj);
      } else if (header.type === 'date-range') {
        filters.push([new Date(), new Date()]);
      } else filters.push([]);
    });
    setSelectedFilters(filters);
  };

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

  const filtersHeader = () => {
    return (
      <div className={classes.filtersHeader}>
        <p className={classes.filtersHeaderTitle}>Decision Dashboard</p>
        <CustomButton
          isPrimary={false}
          variant='outlined'
          height={32}
          width={104}
          label='Filters'
          startIcon={<FilterListIcon />}
          onButtonClick={() => setFiltersExpanded(!filtersExpanded)}
        />
      </div>
    );
  };

  const filters = () => {
    return (
      <div className={classes.filters}>
        <Grid container spacing={3} columns={15}>
          {filtersHeaderData?.map((filter) =>
            filter.type === 'single-select' ||
            filter.type === 'multi-select' ? (
              <Grid
                item
                md={3}
                key={`decision-dashboard_filter-${filter.label}`}
              >
                <SelectRenderer
                  options={
                    filter.dependencyIndex > -1 &&
                    selectedFilters[filter.dependencyIndex].length === 0
                      ? []
                      : filter.options
                  }
                  selectedItems={selectedFilters[filter.index]}
                  isMandatory={false}
                  isMulti={filter.type === 'multi-select'}
                  filterLabel={filter.label}
                  type={filter.index}
                  updateSelected={handleOnSelect}
                />
              </Grid>
            ) : filter.type === 'date' ? (
              <Grid
                item
                md={3}
                key={`decision-dashboard_filter-${filter.label}`}
              >
                <CustomDatePicker
                  label={filter.label}
                  labeldirection={'column'}
                  values={selectedFilters[filter.index]}
                  isMandatory={false}
                  onChange={(value) => handleDateChange(value, filter.index)}
                />
              </Grid>
            ) : filter.type === 'date-range' ? (
              <Grid
                item
                md={3}
                key={`decision-dashboard_filter-${filter.label}`}
              >
                <CustomDateRangePicker
                  label={filter.label}
                  labeldirection={'column'}
                  values={selectedFilters[filter.index]}
                  isMandatory={false}
                  onChange={(values) =>
                    handleDateRangeChange(values, filter.index)
                  }
                />
              </Grid>
            ) : filter.type === 'checkboxes' ? (
              <Grid
                item
                md={3}
                key={`decision-dashboard_filter-${filter.label}`}
              >
                <CheckboxGroup
                  label={filter.label}
                  options={filter.fields}
                  row={true}
                  values={selectedFilters[filter.index]}
                  isMandatory={false}
                  handleChange={(e) => handleCheckboxChange(e, filter.index)}
                />
              </Grid>
            ) : null
          )}
          <Grid item md={3.5} xl={3} display={'flex'} alignItems={'flex-end'}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <CustomButton
                  isPrimary={true}
                  variant='contained'
                  height={36}
                  width={104}
                  label='Filter'
                  startIcon={<FilterAltOutlined />}
                  onButtonClick={() => applyFilter()}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <CustomButton
                  isPrimary={false}
                  variant='outlined'
                  height={36}
                  width={104}
                  label='Reset'
                  startIcon={<Refresh />}
                  onButtonClick={() => resetFilters()}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  const getChartTabs = async (columnRange) => {
    try {
      const sheetName = 'page1';
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      );

      let tabs = await response.data.values[1];
      tabs = tabs.map((tab) => {
        return {
          label: tab,
          id: tab,
        };
      });

      setTabs([...tabs]);
    } finally {
      // setLoading(false);
    }
  };

  const getChartData = async (columnRange) => {
    try {
      const sheetName = 'page1';
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      );

      const header = response?.data?.values[1];

      const newData = [];

      for (let i = 2; i < response?.data?.values.length; i++) {
        let newRow = {};
        for (let j = 0; j < header.length; j++) {
          newRow[header[j]] = response?.data?.values[i][j] || null;
        }
        newData.push(newRow);
      }

      const dates = [];
      const obj = {};
      const colors = [
        '#F49125',
        '#65A0EF',
        '#8373FF',
        '#C95BAC',
        '#13AD91',
        '#CECECE',
        '#696969',
      ];

      newData.forEach((dataItem) => {
        if (!obj[dataItem.type]) {
          obj[dataItem.type] = {};
          obj[dataItem.type][dataItem.label] = {
            id: dataItem.label,
            name: dataItem.label,
            data: [Number(dataItem.value)],
            visible: dataItem.is_visible === 'yes',
            dashStyle: dataItem.futuristic_value === 'yes' ? 'Dash' : 'Solid',
          };
        } else {
          if (!obj[dataItem.type][dataItem.label]) {
            obj[dataItem.type][dataItem.label] = {
              id: dataItem.label,
              name: dataItem.label,
              data: [Number(dataItem.value)],
              visible: dataItem.is_visible === 'yes',
              dashStyle: dataItem.futuristic_value === 'yes' ? 'Dash' : 'Solid',
            };
          } else {
            obj[dataItem.type][dataItem.label].data.push(
              Number(dataItem.value)
            );
          }
        }

        if (dates.indexOf(dataItem.date) === -1) {
          dates.push(dataItem.date);
        }
      });

      Object.keys(obj).forEach((key) => {
        const currentObj = { ...obj[key] };
        const dataArray = [];

        Object.keys(currentObj).forEach((dataKey, index) => {
          currentObj[dataKey].color = colors[index];
          dataArray.push(currentObj[dataKey]);
        });

        obj[key] = dataArray;
      });

      setData({ ...obj });
    } finally {
      // setLoading(false);
    }
  };

  const getChartVariance = async (columnRange) => {
    try {
      const sheetName = 'page1';
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      );

      const header = response?.data?.values[1];

      const newData = [];

      for (let i = 2; i < response?.data?.values.length; i++) {
        let newRow = {};
        for (let j = 0; j < header.length; j++) {
          newRow[header[j]] = response?.data?.values[i][j] || null;
        }
        newData.push(newRow);
      }

      let obj = {};

      newData.forEach((dataItem) => {
        if (!obj[dataItem.type]) {
          obj[dataItem.type] = { ...dataItem };
        } else {
          obj[dataItem.type] = { ...dataItem };
        }
      });

      setChartVariance(obj);
    } finally {
      // setLoading(false);
    }
  };

  const getVarianceConfig = async (columnRange) => {
    try {
      const sheetName = 'dev_config';
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      );

      const tableHeader = await response.data.values[0];
      let configHeader = await response.data.values[1];

      const newData = [];

      for (let i = 2; i < response?.data?.values.length; i++) {
        let newRow = {};
        for (let j = 0; j < configHeader.length; j++) {
          newRow[configHeader[j]] = response?.data?.values[i][j] || null;
        }
        newData.push(newRow);
      }

      setVarianceTableTitle(tableHeader);
      setVarianceConfig(newData);
    } finally {
      // setLoading(false);
    }
  };

  const getVarianceData = async (columnRange) => {
    try {
      const sheetName = 'page1';
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      );

      let configHeader = await response.data.values[1];

      const newData = [];

      for (let i = 2; i < response?.data?.values.length; i++) {
        let newRow = {};
        for (let j = 0; j < configHeader.length; j++) {
          newRow[configHeader[j]] = response?.data?.values[i][j] || null;
        }
        newData.push(newRow);
      }

      setVarianceData([...newData]);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const getSheet = async () => {
      try {
        const sheetName = 'config';
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
        );
        const header = await response.data.values[0];

        const newData = [];

        for (let i = 1; i < response.data.values.length; i++) {
          let newRow = {};
          for (let j = 0; j < header.length; j++) {
            newRow[header[j]] = response.data.values[i][j] || null;
          }
          newData.push(newRow);
        }
        setConfigData(newData);
      } finally {
        // setLoading(false);
      }
    };

    getSheet();
  }, [user]);

  useEffect(() => {
    const filterTableCells = configData[0]?.['Filters'];
    if (!filterTableCells) return;
    const getFilters = async () => {
      try {
        const sheetName = 'page1';
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${filterTableCells}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
        );
        const header = response?.data?.values[1];
        let lastSelectFieldIndex = -1;

        const newData = [];

        for (let i = 3; i < response?.data?.values.length; i++) {
          let newRow = {};
          for (let j = 0; j < header.length; j++) {
            newRow[header[j]] = response?.data?.values[i][j] || null;
          }

          newData.push(newRow);
        }

        const formattedHeader = response?.data?.values[1].map((el, idx) => {
          const type = response?.data?.values[2][idx];
          const isSelectField =
            type === 'single-select' || type === 'multi-select';
          const areCheckboxes = type === 'checkboxes';

          const headerObj = {
            id: el,
            type,
            label: el,
            index: idx,
            dependencyIndex: isSelectField ? lastSelectFieldIndex : -1,
          };

          if (isSelectField) {
            lastSelectFieldIndex = idx;

            headerObj.options = [];

            newData.forEach((data) => {
              if (data[el]) {
                headerObj.options.push({
                  label: data[el],
                  value: data[el],
                });
              }
            });
          } else if (areCheckboxes) {
            headerObj.fields = [];

            newData.forEach((data) => {
              if (data[el]) {
                headerObj.fields.push({
                  label: data[el],
                  value: data[el].toLowerCase().replaceAll(' ', '_'),
                });
              }
            });
          }

          return headerObj;
        });

        let selectedFiltersValues = [];

        formattedHeader.forEach((header) => {
          if (header.type === 'date') {
            selectedFiltersValues.push(new Date());
          } else if (header.type === 'checkboxes') {
            const obj = {};

            header.fields.forEach((field) => {
              obj[field.value] = false;
            });

            selectedFiltersValues.push(obj);
          } else if (header.type === 'date-range') {
            selectedFiltersValues.push([new Date(), new Date()]);
          } else selectedFiltersValues.push([]);
        });

        setSelectedFilters(selectedFiltersValues);
        setFiltersHeaderData(formattedHeader);
      } finally {
        // setLoading(false);
      }
    };

    getFilters();
  }, [user, configData]);

  useEffect(() => {
    if (configData && configData[0]?.['Chart Tabs']) {
      getChartTabs(configData[0]?.['Chart Tabs']);
      getChartData(configData[0]?.['Chart Data']);
      getChartVariance(configData[0]?.['Chart Variance']);
      getVarianceConfig(configData[0]?.['Pool Variance Config']);
      getVarianceData(configData[0]?.['Pool Variance']);
    }
  }, [configData]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomCard cardStyles={classes.headerCard}>
            <CustomAccordion
              summary={filtersHeader()}
              details={filters()}
              expanded={filtersExpanded}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={8.5}>
          <CustomCard cardStyles={classes.headerCard}>
            <DashboardData
              tabs={tabs}
              chartData={data}
              chartVariance={chartVariance}
              handleTabChange={handleTabChange}
              tabIndex={tabIndex}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12} md={3.5}>
          <CustomCard cardStyles={classes.headerCard} fullHeight={true}>
            <VarianceData
              tableHeader={varianceTableTitle}
              tableConfig={varianceConfig}
              data={varianceData}
            />
          </CustomCard>
        </Grid>
        <Grid item xs={12}>
          <CustomCard cardStyles={classes.headerCard}>
            <div style={{ padding: '0 16px' }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  padding: '8px 40px',
                }}
              >
                <div className={classes.headerBox}>
                  <p className={classes.selectTitle}>View By:-</p>

                  <SelectRenderer
                    options={colourOptions}
                    selectedItems={[]}
                    isMandatory={false}
                    isMulti={false}
                    filterLabel={''}
                    type={'abc'}
                    width={160}
                    updateSelected={handleOnSelect}
                  />
                </div>
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
                    width: 880,
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
                    <span className={classes.legendMarker2}></span> Over
                    Achieving
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
            <DashboardTable
              user={user}
              tableCells={configData[0]?.['Table']}
              tableConfig={configData[0]?.['Table Config']}
              tabs={configData[0]?.['Table Tabs']}
              filters={configData[0]?.['Table Filters']}
              switches={configData[0]?.['Table Groups']}
            />
          </CustomCard>
        </Grid>
      </Grid>
    </div>
  );
};

export default DecisionDashboard;
