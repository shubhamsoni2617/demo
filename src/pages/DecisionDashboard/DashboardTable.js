import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import SimpleTabs from '../../components/SimpleTabs';
import { Table } from '../../components/Table';
import CustomButton from '../../components/CustomButton';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomRadioGroup from '../../components/CustomRadioGroup';

import { colourOptions } from './data';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';

const styles = (theme) => ({
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '0 32px',
  },
  tableTimeline: {
    margin: 0,
    color: theme.palette.stroke,
  },
  tableTimelineDate: {
    color: theme.palette.textDark,
    marginLeft: 8,
  },
  body: {
    padding: '8px 32px',
  },
  bodyFilters: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  bodyFooter: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    width: '100%',
    margin: '32px 16px',
  },
  filterActions: {
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
});

const useStyles = makeStyles(styles);

const DashboardTable = (props) => {
  const classes = useStyles();
  const { user, tableCells, tableConfig, tabs, filters, switches } = props;

  const [tabIndex, setTabIndex] = useState(0);
  const [columnDefs, setColumnDefs] = useState([]);
  const [tableFilters, setTableFilters] = useState({
    tableFilter: [],
  });
  const [tableType, setTableType] = useState('collection_total');
  const [rowData, setRowData] = useState([]);
  const [tableTabs, setTableTabs] = useState([]);
  const [radioGroup, setRadioGroup] = useState([]);
  const [filtersHeaderData, setFiltersHeaderData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleOnSelect = ({ selectedItems, type }) => {
    const filters = { ...tableFilters };
    filters[type] = selectedItems;
    setTableFilters(filters);
  };

  const handleTableTypeChange = (e) => {
    setTableType(e.target.value);
  };

  const getTableData = (tableConfig) => {
    if (!tableCells) return;
    const sheetName = 'Page1';

    axios
      .get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${tableCells}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      )
      .then(({ data }) => {
        const { values } = data;
        const hasParent = tableConfig.some(({ Parent }) => Parent !== '-');
        const formattedData = tableConfig.reduce((a, b, i) => {
          if (b.Parent !== '-') {
            if (a[b.Parent]) {
              a[b.Parent].push({ ...b, field: b.label });
            } else {
              a[b.Parent] = [{ ...b, field: b.label, index: i }];
            }
          }
          return a;
        }, {});

        const formattedHeader = [];

        tableConfig.forEach((el, idx) => {
          if (el.Parent === '-') {
            formattedHeader.push({
              field: el.label,
              valueFormatter: (params) => params.data[el.label] || '-',
            });
          }
          if (
            el.Parent !== '-' &&
            formattedData[el.Parent][0]['index'] === idx
          ) {
            formattedHeader.push({
              headerName: el.Parent,
              children: formattedData?.[el.Parent],
              valueFormatter: (params) => params.data[el.label] || '-',
            });
          }
        });

        formattedHeader[0] = {
          ...formattedHeader[0],
          cellRenderer: 'childMessageRenderer',
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
        };

        const newData = [];

        for (let i = hasParent ? 3 : 2; i < values.length; i++) {
          let newRow = {};
          for (let j = 0; j < tableConfig.length; j++) {
            newRow[tableConfig[j]['label']] = values[i][j] || null;
          }
          newData.push(newRow);
        }
        setColumnDefs(formattedHeader);
        setRowData(newData);
      });
  };

  const getTableTabs = async (columnRange) => {
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

      setTableTabs(newData);
    } finally {
      // setLoading(false);
    }
  };

  const getTableFilters = async (columnRange) => {
    try {
      const sheetName = 'page1';
      const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${columnRange}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
      );
      const header = response?.data?.values[1];
      const formattedHeader = response?.data?.values[1].map((el, idx) => ({
        id: el,
        isMulti: true,
        label: el,
        index: idx,
      }));

      const newData = [];

      for (let i = 2; i < response?.data?.values.length; i++) {
        let newRow = {};
        for (let j = 0; j < header.length; j++) {
          newRow[header[j]] = response?.data?.values[i][j] || null;
        }
        newData.push(newRow);
      }
      setSelectedFilters(new Array(header?.length).fill([]));
      setFiltersHeaderData(formattedHeader);
      setFiltersData(newData);
    } finally {
      // setLoading(false);
    }
  };

  const getTableSwitches = async (columnRange) => {
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

      setRadioGroup(newData);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    if (!tableConfig) return;

    const getDecisionDashboardConfig = async () => {
      try {
        const sheetName = 'dev_config';
        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${user}/values/${sheetName}!${tableConfig}?key=${'AIzaSyCV2KeYtoy-nYXj2MkG2DjWvdXdQBjurCM'}`
        );

        // const tableHeader = await response.data.values[0];
        let configHeader = await response.data.values[1];

        const newData = [];

        for (let i = 2; i < response?.data?.values.length; i++) {
          let newRow = {};
          for (let j = 0; j < configHeader.length; j++) {
            newRow[configHeader[j]] = response?.data?.values[i][j] || null;
          }
          newData.push(newRow);
        }

        getTableData(newData);
      } finally {
        // setLoading(false);
      }
    };
    getDecisionDashboardConfig();
    getTableTabs(tabs);
    getTableFilters(filters);
    getTableSwitches(switches);
  }, [user, tableConfig]);

  const handleTabChange = (_, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        className={classes.header}
      >
        <div>
          <SimpleTabs
            items={tableTabs}
            value={tabIndex}
            handleChange={handleTabChange}
          />
        </div>
        <div>
          <p className={classes.tableTimeline}>
            Decisions For week:{' '}
            <span className={classes.tableTimelineDate}>
              01/01/2022 - 01/07/2022
            </span>
          </p>
        </div>
      </Box>
      <div className={classes.body}>
        <div className={classes.bodyFilters}>
          {filtersHeaderData?.map((filter) => {
            return (
              <div key={`decision-dashboard_filter-${filter.label}`}>
                <SelectRenderer
                  options={filtersData.map((el) => ({
                    label: el[filter.label],
                    value: el[filter.label],
                  }))}
                  selectedItems={selectedFilters[filter.index]}
                  isMandatory={false}
                  isMulti={true}
                  filterLabel={''}
                  width={160}
                  type={filter.index}
                  updateSelected={handleOnSelect}
                />
              </div>
            );
          })}

          {radioGroup?.length > 0 ? (
            <CustomRadioGroup
              options={radioGroup}
              row={true}
              value={tableType}
              handleChange={handleTableTypeChange}
            />
          ) : null}

          <div className={classes.filterActions}>
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={
                <SettingsApplicationsRoundedIcon
                  className={classes.iconButton}
                />
              }
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={<EditRoundedIcon className={classes.iconButton} />}
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
            <CustomButton
              isPrimary={false}
              variant='outlined'
              height={32}
              width={32}
              minWidth={0}
              padding={'16px'}
              label=''
              startIcon={
                <ArrowDownwardRoundedIcon className={classes.iconButton} />
              }
              startIconClass={classes.startIcon}
              onButtonClick={() => console.log('1')}
            />
          </div>
        </div>
        <Table
          // user={user}
          // tableCells={tableCells}
          columnDefs={columnDefs}
          rowData={rowData}
        />
        <div className={classes.bodyFooter}>
          <CustomButton
            isPrimary={true}
            variant='contained'
            height={40}
            width={180}
            label='Save and refresh'
            startIcon={<SaveOutlinedIcon />}
            onButtonClick={() => console.log('1')}
          />
          <CustomButton
            isPrimary={true}
            variant='contained'
            height={40}
            width={120}
            label='Finalize'
            startIcon={<InventoryOutlinedIcon />}
            onButtonClick={() => console.log('1')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
