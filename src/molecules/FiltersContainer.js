import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import SelectRenderer from '../components/Select/SelectRenderer';
import CustomButton from '../components/CustomButton';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import Refresh from '@mui/icons-material/Refresh';
import CustomDatePicker from '../components/CustomDatePicker';
import CustomDateRangePicker from '../components/CustomDateRangePicker';
import CheckboxGroup from '../components/CheckboxGroup';

const styles = (theme) => ({
  filters: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartEnd,
    flexWrap: theme.content.flexStyles.flexWrap.wrap,
    padding: '16px',
  },
});

const useStyles = makeStyles(styles);

const FiltersContainer = ({
  filters,
  selectedFilters,
  handleOnSelect,
  handleDateChange,
  handleDateRangeChange,
  handleCheckboxChange,
  applyFilter,
  resetFilters,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.filters}>
      <Grid container spacing={3} columns={15}>
        {filters?.map((filter) =>
          filter.type === 'single-select' || filter.type === 'multi-select' ? (
            <Grid item md={3} key={`decision-dashboard_filter-${filter.label}`}>
              <SelectRenderer
                options={
                  filter.is_dependent &&
                  selectedFilters[filter.is_dependent_on]?.length === 0
                    ? []
                    : filter.filter_values
                }
                selectedItems={selectedFilters[filter.id]}
                isMandatory={false}
                isMulti={filter.type === 'multi-select'}
                filterLabel={filter.label}
                type={filter.id}
                updateSelected={handleOnSelect}
              />
            </Grid>
          ) : filter.type === 'date' ? (
            <Grid item md={3} key={`decision-dashboard_filter-${filter.label}`}>
              <CustomDatePicker
                label={filter.label}
                labeldirection={'column'}
                values={selectedFilters[filter.index]}
                isMandatory={false}
                onChange={(value) => handleDateChange(value, filter.index)}
              />
            </Grid>
          ) : filter.type === 'datetime' ? (
            <Grid item md={3} key={`decision-dashboard_filter-${filter.label}`}>
              <CustomDateRangePicker
                label={filter.label}
                labeldirection={'column'}
                values={selectedFilters[filter.id]}
                isMandatory={false}
                onChange={(values) => handleDateRangeChange(values, filter.id)}
              />
            </Grid>
          ) : filter.type === 'checkboxes' ? (
            <Grid item md={3} key={`decision-dashboard_filter-${filter.label}`}>
              <CheckboxGroup
                label={filter.label}
                options={filter.filter_values}
                row={true}
                values={selectedFilters[filter.id]}
                isMandatory={false}
                handleChange={(e) => handleCheckboxChange(e, filter.id)}
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

export default FiltersContainer;
