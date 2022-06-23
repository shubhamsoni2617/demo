import React from 'react';
import { makeStyles } from '@mui/styles';

import FilterListIcon from '@mui/icons-material/FilterList';
import CustomButton from '../components/CustomButton';

const styles = (theme) => ({
  filtersHeader: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    padding: '0 16px',
  },
  filtersHeaderTitle: {
    ...theme.typography.fontSizes.sectionHeaderText,
    margin: '0',
    marginRight: 48,
    fontWeight: theme.typography.fontWeight.bold,
  },
});

const useStyles = makeStyles(styles);

const FiltersHead = ({ filtersExpanded, setFiltersExpanded }) => {
  const classes = useStyles();

  return (
    <div className={classes.filtersHeader}>
      <p className={classes.filtersHeaderTitle}>{'Executive Summary'}</p>
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

export default FiltersHead;
