import React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
const styles = (theme) => ({
  buttonContainedPrimary: {
    background: `${theme.palette.bgSwitch} !important`,
    borderRadius: '3px',
    margin: 8,
    transition: 'all 0.3s',
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  buttonContainedSecondary: {
    background: `${theme.palette.stroke} !important`,
    width: '100%',
    borderRadius: '3px',
    margin: 8,
    transition: 'all 0.3s',
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  buttonOutlinedPrimary: {
    width: '100%',
    border: `1px solid ${theme.palette.bgSwitch} !important`,
    borderRadius: '3px',
    background: 'transparent !important',
    margin: 8,
    transition: 'all 0.3s',
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  buttonOutlinedSecondary: {
    width: '100%',
    border: `1px solid ${theme.palette.stroke} !important`,
    borderRadius: '3px',
    background: 'transparent !important',
    margin: 8,
    transition: 'all 0.3s',
    '&:active': {
      transform: 'scale(0.9)',
    },
  },
  buttonTextContained: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.normal,
    textTransform: theme.typography.textTransform.capitalize,
    color: `${theme.palette.textWhite} !important`,
    letterSpacing: '-0.42px',
  },
  buttonTextOutlinedPrimary: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.normal,
    textTransform: theme.typography.textTransform.capitalize,
    color: theme.palette.bgSwitch,
    letterSpacing: '-0.42px',
  },
  buttonTextOutlinedSecondary: {
    ...theme.typography.fontSizes.normalText,
    fontWeight: theme.typography.fontWeight.normal,
    textTransform: theme.typography.textTransform.capitalize,
    color: theme.palette.stroke,
    letterSpacing: '-0.42px',
  },
});

const useStyles = makeStyles(styles);

const CustomButton = (props) => {
  const {
    isPrimary,
    variant,
    height,
    width,
    minWidth,
    padding,
    label,
    labelClass,
    disabled,
    startIcon,
    endIcon,
    startIconClass,
    onButtonClick,
  } = props;
  const classes = useStyles();

  return (
    <div>
      <Button
        variant={variant}
        disableElevation
        disableFocusRipple
        disabled={disabled}
        className={
          variant === 'contained'
            ? isPrimary
              ? classes.buttonContainedPrimary
              : classes.buttonContainedSecondary
            : isPrimary
            ? classes.buttonOutlinedPrimary
            : classes.buttonOutlinedSecondary
        }
        startIcon={startIcon ? startIcon : null}
        endIcon={endIcon ? endIcon : null}
        classes={{
          contained: labelClass ? labelClass : classes.buttonTextContained,
          outlined: labelClass
            ? labelClass
            : isPrimary
            ? classes.buttonTextOutlinedPrimary
            : classes.buttonTextOutlinedSecondary,
          startIcon: startIconClass,
        }}
        style={{
          height,
          width,
          minWidth,
          padding: `${padding} !important`,
        }}
        onClick={onButtonClick}
      >
        {label}
      </Button>
    </div>
  );
};

CustomButton.propTypes = {
  isPrimary: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined']),
  height: PropTypes.number,
  width: PropTypes.number,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  startIcon: PropTypes.element,
  endIcon: PropTypes.element,
  onButtonClick: PropTypes.func,
};

export default CustomButton;
