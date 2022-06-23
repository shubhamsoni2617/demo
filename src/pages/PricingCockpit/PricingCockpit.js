import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomButton from '../../components/CustomButton';
import CustomCard from '../../components/CustomCard';
import CustomAccordion from '../../components/CustomAccordion';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import Refresh from '@mui/icons-material/Refresh';
import { UserContext } from '../../App';
import axios from 'axios';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomDateRangePicker from '../../components/CustomDateRangePicker';
import CheckboxGroup from '../../components/CheckboxGroup';
import FilterOne from './FilterOne';

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

const PricingCockpit = () => {
  const user = useContext(UserContext);

  const classes = useStyles();
  const [configData, setConfigData] = useState({});
  const [tabs, setTabs] = useState([]);
  const [dataCardValues, setDataCardValues] = useState([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filtersHeaderData, setFiltersHeaderData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState([]);

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
    const filters = [...selectedFilters];

    for (let i = 0; i < filtersHeaderData.length; i++) {
      if (
        (filtersHeaderData[i].type === 'multi-select' ||
          filtersHeaderData.type === 'single-select') &&
        filters[filtersHeaderData[i].index]?.length > 0
      ) {
        setAppliedFilters([...filters]);
        break;
      }
    }
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
    setAppliedFilters([]);
  };

  const filtersHeader = () => {
    return (
      <div className={classes.filtersHeader}>
        <p className={classes.filtersHeaderTitle}>{configData[0]?.Page}</p>
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
          <Grid item md={3} xl={3} display={'flex'} alignItems={'flex-end'}>
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

  const getDataCardValues = async (columnRange) => {
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

        if (newRow.type === 'revenue') {
          newRow.color = '#d4c628';
          newRow.background = '#f9f6df';
        } else if (newRow.type === 'sales') {
          newRow.color = '#f59d3d';
          newRow.background = '#fff5e9';
        } else if (newRow.type === 'margin') {
          newRow.color = '#52c482';
          newRow.background = '#ebf9f1';
        } else {
          newRow.color = '#557386';
          newRow.background = '#e5eaed';
        }

        if (newRow.change === 'down') {
          newRow.changeColor = '#ef605f';
        } else {
          newRow.changeColor = '#2abc79';
        }

        newData.push(newRow);
      }

      setDataCardValues([...newData]);
    } finally {
      // setLoading(false);
    }
  };

  // const getDataTabs = async (columnRange) => {
  //   try {
  //     const sheetName = 'page1';
  //     const response = await axios.get(
  //       `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
  //     );

  //     let configHeader = await response.data.values[1];

  //     const newData = [];

  //     for (let i = 2; i < response?.data?.values.length; i++) {
  //       let newRow = {};
  //       for (let j = 0; j < configHeader.length; j++) {
  //         newRow[configHeader[j]] = response?.data?.values[i][j] || null;
  //       }
  //     }

  //     console.log('data', newData);
  //     // setTabs([...tabs]);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const getDataTabs = async (columnRange) => {
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

      setTabs([...newData]);
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
    if (configData && configData[0]?.['Data Card']) {
      getDataCardValues(configData[0]?.['Data Card']);
      getDataTabs(configData[0]?.['Data Tabs']);
    }
  }, [configData]);

  return (
    <div>
      {configData?.length > 0 && (
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

          {appliedFilters?.length > 0 && (
            <Grid item xs={12}>
              <FilterOne
                configData={configData}
                dataCardValues={dataCardValues}
                tabs={tabs}
              />
            </Grid>
          )}
        </Grid>
      )}
    </div>
  );
};

export default PricingCockpit;
