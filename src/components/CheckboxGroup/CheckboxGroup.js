import React from 'react';
import { makeStyles } from '@mui/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import { Checkbox } from '@mui/material';

import UnCheckedIcon from '../../assets/svg/unchecked.svg';
import CheckedIcon from '../../assets/svg/check.svg';

const styles = (theme) => ({
  tab: {
    border: '4px solid #dfeaf5',
  },
  label: {
    display: 'block',
    paddingBottom: '5px',
    color: '#8596a9',
    textTransform: 'capitalize',
    fontSize: '0.9rem',
  },
  checkboxLabel: {
    color: '#515151',
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '1.36',
  },
});

const useStyles = makeStyles(styles);

const CheckboxGroup = (props) => {
  const { options, label, row, values, handleChange } = props;
  const classes = useStyles();

  return (
    <FormControl>
      {label ? (
        <FormLabel
          id='demo-row-radio-buttons-group-label'
          className={classes.label}
        >
          {label}
        </FormLabel>
      ) : null}

      <FormGroup style={{ display: 'flex', flexDirection: row && 'row' }}>
        {options?.map((option) => (
          <FormControlLabel
            key={`checkbok-${option.value}`}
            control={
              <Checkbox
                checked={values[option.value]}
                icon={<img src={UnCheckedIcon} alt='unchecked' />}
                checkedIcon={<img src={CheckedIcon} alt='unchecked' />}
                onChange={handleChange}
                name={option.value}
              />
            }
            classes={{
              label: classes.checkboxLabel,
            }}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxGroup;
