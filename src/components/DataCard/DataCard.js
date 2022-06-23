import React from 'react';
import { makeStyles } from '@mui/styles';

import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropDownOutlined from '@mui/icons-material/ArrowDropDownOutlined';

import InventoryIcon from '../../assets/svg/inventory.svg';
import LogisticsIcon from '../../assets/svg/logistics.svg';
import MoneyIcon from '../../assets/svg/money.svg';
import MoneyBagIcon from '../../assets/svg/money_bag.svg';

const styles = (theme) => ({
  container: {
    padding: '16px 24px',
  },
  headerContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
  },
  headerIconContainer: (props) => ({
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignCenter,
    background: props.background,
    height: 40,
    width: 40,
    borderRadius: '50%',
    marginRight: 8,
  }),
  headerIcon: {
    fontSize: 16,
  },
  headerText: {
    margin: 0,
    fontSize: '1.15rem',
    fontWeight: 500,
    color: theme.palette.textDark,
  },
  trendUp: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    color: '#2abc79',
  },
  trendDown: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignStartCenter,
    color: '#ef605f',
  },
  trendIcon: {
    color: 'inherit',
    fontSize: 40,
    marginRight: -6,
  },
  trendText: {
    margin: 0,
    fontWeight: 500,
    color: 'inherit',
  },
  subHeaderContainer: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    paddingBottom: '8px',
    borderBottom: `1px solid #deecf4`,
  },
  subHeaderText: {
    fontSize: '0.85rem',
    fontWeight: 400,
    letterSpacing: '0.2px',
    margin: '8px 0 0 0',
    color: theme.palette.textDark,
  },
  subHeaderValue: {
    fontSize: '1.35rem',
    fontWeight: 500,
    margin: '0px 0',
    color: '#3a5a6e',
  },
  changeContainerUp: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    color: '#2abc79',
    background: '#f5f6f7',
    padding: '0px 8px 0px 0',
    borderRadius: '4px',
  },
  changeContainerDown: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    color: '#ef605f',
    background: '#f5f6f7',
    padding: '0px 8px 0px 0',
    borderRadius: '4px',
  },
  changeIcon: {
    color: 'inherit',
    fontSize: '32px',
    marginRight: -4,
  },
  changeText: {
    color: theme.palette.textDark,
    margin: 0,
    fontSize: '0.9rem',
    letterSpacing: '0.2px',
  },
  dataContainer: {
    marginTop: 4,
  },
  data: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
  },
  dataHeader: {
    fontSize: '0.8rem',
    color: theme.palette.stroke,
    margin: '4px 0',
  },
  dataValue: {
    margin: '4px 0',
    color: '#3a5a6e',
  },
});

const useStyles = makeStyles(styles);

const backgrounds = {
  revenue: 'rgb(208 193 14 / 14%)',
  sales_units: 'rgb(252 179 98 / 14%)',
  margin: 'rgb(235, 249, 241)',
  sell_through: 'rgb(68 103 123 / 14%)',
};

const DataCard = (props) => {
  const { data, onClick } = props;
  const classes = useStyles({
    background: backgrounds[data.type],
    changeColor: data.changeColor,
  });

  return (
    <div
      className={classes.container}
      onClick={() => {
        onClick(data.type);
      }}
    >
      <div className={classes.headerContainer}>
        <div className={classes.header}>
          <div className={classes.headerIconContainer}>
            {data.type === 'revenue' ? (
              <img
                src={LogisticsIcon}
                alt='revenue'
                className={classes.headerIcon}
              />
            ) : data.type === 'sales_units' ? (
              <img
                src={MoneyIcon}
                alt='sales units'
                className={classes.headerIcon}
              />
            ) : data.type === 'margin' ? (
              <img
                src={MoneyBagIcon}
                alt='margin'
                className={classes.headerIcon}
              />
            ) : (
              <img
                src={InventoryIcon}
                alt='sell through'
                className={classes.headerIcon}
              />
            )}
          </div>
          <p className={classes.headerText}>{data.label}</p>
        </div>
        <div
          className={
            data?.change_from_planned &&
            data?.change_from_planned.split('-').length > 1
              ? classes.trendDown
              : classes.trendUp
          }
        >
          {data?.change_from_planned &&
          data?.change_from_planned.split('-').length > 1 ? (
            <ArrowDropDownOutlinedIcon className={classes.trendIcon} />
          ) : (
            <ArrowDropUpOutlinedIcon className={classes.trendIcon} />
          )}
          <p className={classes.trendText}>
            {data?.change_from_planned.split('-').length > 1
              ? data?.change_from_planned.split('-')[1]
              : data?.change_from_planned.split('-')[0]}
          </p>
        </div>
      </div>
      <div className={classes.subHeaderContainer}>
        <div className={classes.subHeader}>
          <p className={classes.subHeaderText}>{'Actual/Predicted'}</p>
          <p className={classes.subHeaderValue}>{data.actual_value}</p>
        </div>
        {data?.change_from_recommended ? (
          <div
            className={
              data.change_from_recommended.split('-').length > 1
                ? classes.changeContainerDown
                : classes.changeContainerUp
            }
          >
            {data.change_from_recommended.split('-').length > 1 ? (
              <ArrowDropDownOutlined className={classes.changeIcon} />
            ) : (
              <ArrowDropUpOutlinedIcon className={classes.changeIcon} />
            )}
            <p className={classes.changeText}>
              {data.change_from_recommended.split('-').length > 1
                ? data.change_from_recommended.split('-')
                : data.change_from_recommended}
            </p>
          </div>
        ) : null}
      </div>
      <div className={classes.dataContainer}>
        {data?.recommended_value && (
          <div className={classes.data}>
            <p className={classes.dataHeader}>{'Recommended'}</p>
            <p className={classes.dataValue}>{data.recommended_value}</p>
          </div>
        )}
        {data?.prev_week_value && (
          <div className={classes.data}>
            <p className={classes.dataHeader}>{'Last Week'}</p>
            <p className={classes.dataValue}>{data?.prev_week_value}</p>
          </div>
        )}
        {data?.planned_value && (
          <div className={classes.data}>
            <p className={classes.dataHeader}>{'Planned'}</p>
            <p className={classes.dataValue}>{data?.planned_value}</p>
          </div>
        )}
        {data?.ltd_value && (
          <div className={classes.data}>
            <p className={classes.dataHeader}>{'Life to date'}</p>
            <p className={classes.dataValue}>{data?.ltd_value}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataCard;
