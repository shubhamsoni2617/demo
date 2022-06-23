import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import CustomCard from '../../components/CustomCard';
import CustomAccordion from '../../components/CustomAccordion';
import FiltersHead from '../../molecules/FiltersHead';
import FiltersContainer from '../../molecules/FiltersContainer';
import { GetFilters } from '../../services/filters';
import DashboardSummary from './DashboardSummary';
import LoadingOverlay from '../../components/LoadingOverlay';

const styles = (theme) => ({
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
});

const useStyles = makeStyles(styles);

const CarterExecutiveSummary = () => {
  const classes = useStyles();
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [filtersHeaderData, setFiltersHeaderData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});

  const {
    isLoading,
    data: filters,
    refetch: refetchFilters,
    isFetching,
  } = GetFilters({});

  const handleOnSelect = ({ selectedItems, type }) => {
    const filters = { ...selectedFilters };
    filters[type] = selectedItems;

    if (selectedItems?.length === 0) {
      filtersHeaderData.forEach((filterHeader) => {
        if (
          (filterHeader.type === 'select' ||
            filterHeader.type === 'multi-select') &&
          filterHeader.id >= type
        ) {
          filters[filterHeader.id] = [];
        }
      });
    }

    setSelectedFilters(filters);
  };

  const handleDateChange = (value, index) => {
    const filters = { ...selectedFilters };
    filters[index] = value;

    setSelectedFilters(filters);
  };

  const handleDateRangeChange = (values, index) => {
    const filters = { ...selectedFilters };
    filters[index] = values;

    setSelectedFilters(filters);
  };

  const handleCheckboxChange = (e, index) => {
    const filters = { ...selectedFilters };

    const values = { ...selectedFilters[index] };
    values[e.target.name] = !values[e.target.name];

    filters[index] = { ...values };
    setSelectedFilters(filters);
  };

  const applyFilter = () => {
    const filters = { ...selectedFilters };

    for (let i = 0; i < filtersHeaderData.length; i++) {
      if (
        (filtersHeaderData[i].type === 'multi-select' ||
          filtersHeaderData[i].type === 'single-select') &&
        filters[filtersHeaderData[i].id]?.length > 0
      ) {
        setAppliedFilters(filters);
        break;
      }
    }
  };

  const resetFilters = () => {
    let filters = {};

    filtersHeaderData.forEach((header) => {
      if (header.type === 'date') {
        const values = [];
        values.push(new Date());

        filters[header.id] = values;
      } else if (header.type === 'checkboxes') {
        const obj = {};

        header.filter_values.forEach((field) => {
          obj[field.value] = false;
        });

        filters[header.id] = obj;
      } else if (header.type === 'datetime') {
        const values = [];
        values.push(new Date());
        values.push(new Date());

        filters[header.id] = values;
      } else filters[header.id] = [];
    });
    setSelectedFilters(filters);
    setAppliedFilters({});
  };

  const setFilters = (filters) => {
    let selectedFiltersValues = {};

    filters?.forEach((header) => {
      if (header.type === 'date') {
        const values = [];
        values.push(new Date());

        selectedFiltersValues[header.id] = values;
      } else if (header.type === 'checkboxes') {
        const obj = {};

        header.filter_values.forEach((field) => {
          obj[field.value] = false;
        });

        selectedFiltersValues[header.id] = obj;
      } else if (header.type === 'datetime') {
        const values = [];
        values.push(new Date());
        values.push(new Date());

        selectedFiltersValues[header.id] = values;
      } else {
        selectedFiltersValues[header.id] = [];
      }
    });

    setSelectedFilters(selectedFiltersValues);
    setFiltersHeaderData(filters);
  };

  useEffect(() => {
    refetchFilters();
  }, []);

  useEffect(() => {
    if (filters && filters?.length > 0) {
      setFilters(filters);
    }
  }, [filters]);

  return (
    <div>
      {isLoading ? (
        <LoadingOverlay
          loader
          text='Fetching Data'
          position='relative'
          background='transparent'
          // color='#fff'
        />
      ) : null}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomCard cardStyles={classes.headerCard}>
            <CustomAccordion
              summary={
                <FiltersHead
                  filtersExpanded={filtersExpanded}
                  setFiltersExpanded={setFiltersExpanded}
                />
              }
              details={
                <FiltersContainer
                  filters={filtersHeaderData}
                  selectedFilters={selectedFilters}
                  handleOnSelect={handleOnSelect}
                  handleDateChange={handleDateChange}
                  handleDateRangeChange={handleDateRangeChange}
                  handleCheckboxChange={handleCheckboxChange}
                  applyFilter={applyFilter}
                  resetFilters={resetFilters}
                />
              }
              expanded={filtersExpanded}
            />
          </CustomCard>
        </Grid>

        <Grid item xs={12}>
          <DashboardSummary appliedFilters={appliedFilters} />
        </Grid>
      </Grid>
    </div>
  );
};

export default CarterExecutiveSummary;
