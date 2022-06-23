import React from 'react';
import { makeStyles } from '@mui/styles';
import Chart from '../utils/charts/Chart';

const styles = (theme) => ({
  inventoryContainer: {
    padding: 40,
    borderBottom: `2px dashed ${theme.palette.strokeLightBlue}`,
  },
  header: {
    ...theme.typography.fontSizes.unitText,
    fontWeight: theme.typography.fontWeight.bold,
  },
  chartContainer: {
    margin: '32px 0',
  },
  chart: {
    marginBottom: '24px',
  },
});

const xaxisLine = {
  categories: [
    'Aug 04',
    'Aug 11',
    'Aug 18',
    'Aug 25',
    'Sep 01',
    'Sep 08',
    'Sep 15',
    'Sep 22',
    'Sep 29',
    'Oct 06',
    'Oct 13',
    'Oct 20',
  ],
};

const yaxisLine = {
  title: 'Margin%',
  tickAmount: 6,
  minRange: 100,
};

const xaxisStep = {
  categories: [
    'Aug 04',
    'Aug 11',
    'Aug 18',
    'Aug 25',
    'Sep 01',
    'Sep 08',
    'Sep 15',
    'Sep 22',
    'Sep 29',
    'Oct 06',
    'Oct 13',
    'Oct 20',
  ],
};

const yaxisStep = {
  title: 'Sell Through%',
  tickAmount: 6,
  minRange: 100,
};

const useStyles = makeStyles(styles);

const PromoCharts = ({ title, marginData, sellThroughData }) => {
  const classes = useStyles();

  return (
    <div className={classes.inventoryContainer}>
      <p className={classes.header}>{title}</p>
      <div className={classes.chartContainer}>
        {sellThroughData?.length > 0 && (
          <div className={classes.chart}>
            <Chart
              chartType={'step-area'}
              data={sellThroughData}
              xaxis={xaxisLine}
              yaxis={yaxisLine}
              title={'Margin%'}
              showLegend={true}
              height='350px'
            />
          </div>
        )}
        {marginData?.length > 0 && (
          <div className={classes.chart}>
            <Chart
              chartType={'linechart-area'}
              data={marginData}
              xaxis={xaxisStep}
              yaxis={yaxisStep}
              title={'Sell Through'}
              showLegend={true}
              height='350px'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoCharts;
