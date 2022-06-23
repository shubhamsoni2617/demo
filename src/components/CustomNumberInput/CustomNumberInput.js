import React from 'react';
import { makeStyles } from '@mui/styles';
import classnames from 'classnames';
import { OutlinedInput } from '@mui/material';

import ArrowDropUpIcon from '../../assets/svg/arrow_up.svg';
import ArrowDropDownIcon from '../../assets/svg/arrow_down.svg';
import ArrowDropUpDisabledIcon from '../../assets/svg/arrow_up_disabled.svg';
import ArrowDropDownDisabledIcon from '../../assets/svg/arrow_down_disabled.svg';

const styles = (theme) => ({
  inputFieldRoot: {
    paddingRight: 12,
    paddingLeft: 8,
    background: '#fff',

    '& .MuiOutlinedInput-notchedOutline': {
      border: `0.5px solid ${theme.palette.stroke} !important`,
      borderRadius: '4px',
    },
  },
  inputFieldRootNumber: {
    paddingRight: 0,
  },
  inputField: {
    ...theme.typography.fontSizes.normalText,
    padding: `6px 8px 6px 6px `,
    boxSizing: theme.content.boxSizing.borderBox,
    height: '2.25rem',
    color: theme.palette.textDark,

    '& [type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
    },
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
    },

    '&::placeholder': {
      opacity: 0.3,
    },
  },
  customSpinners: {
    ...theme.content.flexStyles.flexCol,
    ...theme.content.flexStyles.flexAlignCenter,
    background: 'rgb(68 103 123 / 14%)',
    height: 36,
    padding: '4px 10px',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderLeft: `0.5px solid ${theme.palette.stroke}`,
  },
  customSpinnerIcon: {
    height: 10,
    width: 10,
    margin: '4px 0',
    cursor: theme.content.cursor.pointer,
  },
  customSpinnerDisabledIcon: {
    height: 10,
    width: 10,
    margin: '4px 0',
  },
});

const useStyles = makeStyles(styles);

const CustomNumberInput = (props) => {
  const {
    height,
    width,
    disabled,
    marginTop,
    type,
    value,
    placeholder,
    customClasses,
    onValueChange,
  } = props;
  const classes = useStyles();

  const onIncrease = () => {
    !disabled && onValueChange(value + 1, type);
  };

  const onDecrease = () => {
    !disabled && onValueChange(value - 1, type);
  };

  return (
    <OutlinedInput
      id='outlined-adornment-password'
      sx={{ height, width, marginTop }}
      type={'number'}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(e) => onValueChange(e.target.value, type)}
      classes={{
        root: customClasses?.root
          ? classnames(
              classes.inputFieldRoot,
              classes.inputFieldRootNumber,
              customClasses.root
            )
          : classnames(classes.inputFieldRoot, classes.inputFieldRootNumber),
        input: classes.inputField,
      }}
      endAdornment={
        <div
          className={
            customClasses?.spinner
              ? customClasses.spinner
              : classes.customSpinners
          }
        >
          <img
            src={disabled ? ArrowDropUpDisabledIcon : ArrowDropUpIcon}
            alt={'increase'}
            className={
              disabled
                ? classes.customSpinnerDisabledIcon
                : classes.customSpinnerIcon
            }
            onClick={onIncrease}
          />
          <img
            src={disabled ? ArrowDropDownDisabledIcon : ArrowDropDownIcon}
            alt={'decrease'}
            className={
              disabled
                ? classes.customSpinnerDisabledIcon
                : classes.customSpinnerIcon
            }
            onClick={onDecrease}
          />
        </div>
      }
    />
  );
};

export default CustomNumberInput;
