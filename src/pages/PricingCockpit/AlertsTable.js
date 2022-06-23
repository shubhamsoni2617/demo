import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Table } from '../../components/Table';
import SelectRenderer from '../../components/Select/SelectRenderer';
import CustomRadioGroup from '../../components/CustomRadioGroup';

const styles = (theme) => ({
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '0 32px',
  },
  tableTimeline: {
    margin: 0,
    color: theme.palette.textDark,
    fontSize: '1.2rem',
    fontWeight: 600,
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

const Alerts = (props) => {
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
    getTableFilters(filters);
    getTableSwitches(switches);
  }, [user, tableConfig]);

  return (
    <div>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        className={classes.header}
      >
        <div>
          <p className={classes.tableTimeline}>Alerts</p>
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
          // user={user}
          // tableCells={tableCells}
          columnDefs={columnDefs}
          rowData={rowData}
        />
      </div>
    </div>
  );
};

export default Alerts;
