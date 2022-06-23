import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Table } from '../../components/Table';
import CustomButton from '../../components/CustomButton';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomRadioGroup from '../../components/CustomRadioGroup';
import CustomToggleButtonGroup from '../../components/CustomToggleButtonGroup';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import { ToggleButton } from '@mui/material';
import { tableStyle } from './tableStyleClass';

const styles = (theme) => ({
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '0 32px',
  },
  tableTimeline: {
    margin: 0,
    color: theme.palette.stroke,
    padding: 32,
  },
  tableTimelineDate: {
    color: theme.palette.textDark,
    fontWeight: 500,
    marginLeft: 8,
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
  const { user, tableCells, tableConfig, filters, switches } = props;

  const [columnDefs, setColumnDefs] = useState([]);
  const [tableFilters, setTableFilters] = useState({
    tableFilter: [],
  });
  const [tableType, setTableType] = useState('collection_total');
  const [rowData, setRowData] = useState([]);
  const [radioGroup, setRadioGroup] = useState([]);
  const [filtersHeaderData, setFiltersHeaderData] = useState([]);
  const [filtersData, setFiltersData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [activeSwitchTab, setActiveSwitchTab] = useState('monthly');

  const handleOnSelect = ({ selectedItems, type }) => {
    const filters = { ...tableFilters };
    filters[type] = selectedItems;
    setTableFilters(filters);
  };

  const handleTableTypeChange = (e) => {
    setTableType(e.target.value);
  };

  const handleSwitch = (_, newAlignment) => {
    setActiveSwitchTab(newAlignment);
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
        // const header = values[hasParent ? 2 : 1];
        // const formattedHeader = values[hasParent ? 2 : 1].map((el, idx) => {
        //   return {
        //     field: el,
        //     valueFormatter: (params) => params.data[el] || '-',
        //   };
        // });
        // formattedHeader[0] = {
        //   ...formattedHeader[0],
        //   cellRenderer: 'childMessageRenderer',
        //   headerCheckboxSelection: true,
        //   headerCheckboxSelectionFilteredOnly: true,
        //   checkboxSelection: true,
        // };

        const formattedData = tableConfig.reduce((a, b, i) => {
          if (b.Parent !== '-') {
            if (a[b.Parent]) {
              a[b.Parent].push({
                ...b,
                field: b.label,
                cellClass: (params) => {
                  return params?.value ? tableStyle(b, params) : '';
                },
              });
            } else {
              a[b.Parent] = [
                {
                  ...b,
                  field: b.label,
                  cellClass: (params) => {
                    return params?.value ? tableStyle(b, params) : '';
                  },
                  index: i,
                },
              ];
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
              cellClass: (params) => {
                return params?.value ? tableStyle(el, params) : '';
              },
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
          pinned: 'left',
          // cellRenderer: 'childMessageRenderer',
          // headerCheckboxSelection: true,
          // headerCheckboxSelectionFilteredOnly: true,
          // checkboxSelection: true,
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
    // getTableFilters(filters);
    // getTableSwitches(switches);
  }, [user, tableConfig]);

  return (
    <div>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        className={classes.header}
      >
        <div>
          <p className={classes.tableTimeline}>
            Decisions For week:{' '}
            <span className={classes.tableTimelineDate}>W37</span>
          </p>
        </div>
        <div>
          <CustomToggleButtonGroup
            value={activeSwitchTab}
            handleSwitch={handleSwitch}
            borderRadius={8}
            customClasses={{
              tab: classes.switchTab,
            }}
          >
            <ToggleButton
              value={'monthly'}
              aria-label='left aligned'
              classes={{
                root: classes.toggleRoot,
                selected: classes.toggleActive,
              }}
            >
              <p className={classes.switchTabText}>Monthly</p>
            </ToggleButton>
            <ToggleButton
              value={'weekly'}
              aria-label='left aligned'
              classes={{
                root: classes.toggleRoot,
                selected: classes.toggleActive,
              }}
            >
              <p className={classes.switchTabText}>Weekly</p>
            </ToggleButton>
            <ToggleButton
              value={'daily'}
              aria-label='left aligned'
              classes={{
                root: classes.toggleRootLast,
                selected: classes.toggleActive,
              }}
            >
              <p className={classes.switchTabText}>Daily</p>
            </ToggleButton>
          </CustomToggleButtonGroup>
        </div>
        <div className={classes.filterActions}>
          <CustomButton
            isPrimary={false}
            variant='outlined'
            height={32}
            width={32}
            minWidth={0}
            padding={'16px'}
            label=''
            startIcon={<PercentRoundedIcon className={classes.iconButton} />}
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
              <SettingsApplicationsRoundedIcon className={classes.iconButton} />
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
        </div>
        <Table
          user={user}
          tableCells={tableCells}
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
          <CustomButton
            isPrimary={true}
            variant='contained'
            height={40}
            width={160}
            label='Analyze Labor'
            startIcon={<HourglassEmptyRoundedIcon />}
            onButtonClick={() => console.log('1')}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
