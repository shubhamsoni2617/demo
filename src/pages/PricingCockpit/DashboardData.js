import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import _ from 'lodash';
import { Grid } from '@mui/material';

import Chart from '../../utils/charts/Chart';
import CustomRadioGroup from '../../components/CustomRadioGroup';

const styles = (theme) => ({
  title: {
    margin: '0',
    fontSize: '1.05rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  header: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    padding: '32px',
  },
  body: {
    padding: '8px 32px',
  },
  fiscalFilters: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    width: '100%',
  },
  fiscalDates: {
    ...theme.content.flexStyles.flexRow,
    ...theme.content.flexStyles.flexAlignBetweenCenter,
    marginTop: 4,
    height: 37,
    background: theme.palette.bgBadgeLight,
    border: `1px solid ${theme.palette.stroke}`,
    padding: '4px 8px',
    borderRadius: 4,
  },
  fiscalDateText: {
    fontSize: '0.75rem',
    marginRight: 8,
  },
  toggleRoot: {
    padding: '4px',
    background: theme.palette.bgBadgeLight,
    border: 'none',
  },
  toggleActive: {
    padding: '4px',
    background: `${theme.palette.textWhite} !important`,
    border: 'none',
  },
  data: {
    margin: '16px 0',
  },
  forecastData: {
    height: '100%',
    border: `0.5px solid ${theme.palette.stroke}`,
    borderRadius: 4,
    padding: 8,
  },
  forecastDataTitle: {
    fontSize: '1rem',
    fontWeight: theme.typography.fontWeight.semiBold,
  },
  forecastDataItem: {
    fontSize: '0.85rem',
    marginBottom: 0,
    lineHeight: '8px',
  },
  forecastDataItemLabel: {
    fontSize: '0.75rem',
    color: theme.palette.stroke,
  },
});

const useStyles = makeStyles(styles);

const DashboardData = (props) => {
  const classes = useStyles();
  const { title, chartData, switches } = props;

  const [yconfig] = useState({});
  const [activeSwitch, setActiveSwitch] = useState('Sales');

  const xaxis = {
    title: '',
    categories: ['Apr W1', 'Apr W2', 'Apr W3', 'Apr W4', 'Mar W5'],
    plotLines: [
      {
        color: '#e9e9e9',
        width: 1,
        value: 0,
      },
    ],
  };

  const yaxis = {
    title: activeSwitch,
    tickAmount: 5,
    categories: yconfig.categories,
  };

  const handleDataChange = (e) => {
    setActiveSwitch(e.target.value);
  };

  return (
    <div>
      <div className={classes.header}>
        <Grid container>
          <Grid item xs={5} xl={5} display={'flex'} alignItems={'center'}>
            <p className={classes.title}>{title}</p>
          </Grid>
          <Grid item xs={4} xl={4} display={'flex'} alignItems={'center'}>
            {switches?.length > 0 ? (
              <CustomRadioGroup
                options={switches}
                row={true}
                value={activeSwitch}
                handleChange={handleDataChange}
              />
            ) : null}
          </Grid>
        </Grid>
      </div>
      <div className={classes.body}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.data}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Chart
                    chartType={'linechart'}
                    data={
                      chartData?.[activeSwitch] &&
                      _.isEmpty(chartData?.[activeSwitch])
                        ? [{ data: [null, null, null] }]
                        : chartData?.[activeSwitch]
                    }
                    xaxis={xaxis}
                    yaxis={yaxis}
                    showLegend={true}
                    height='460px'
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DashboardData;
