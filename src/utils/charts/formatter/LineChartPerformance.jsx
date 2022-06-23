export const lineChartPerformanceOptions = (props) => {
  return {
    chart: {
      type: 'line',
      height: props.height,
      spacing: [24, 24, 8, 8],
      backgroundColor: '#F5F8FA',
      borderRadius: 12,
      plotBackgroundColor: '#ffffff',
      ignoreHiddenSeries: false,
      style: {
        border: '0.5px solid #34BFA329',
        borderRadius: '12px',
      },
    },
    title: {
      text: props.title,
      align: 'left',
      x: 20,
      margin: 24,
      style: {
        color: '#000',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'Poppins, sans-serif',
      },
    },
    yAxis: {
      title: {
        text: props.yaxis.title,
        style: {
          color: '#000',
          fontSize: '0.8rem',
          fontWeight: '500',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      labels: {
        style: {
          color: '#44677b',
          fontSize: '0.6rem',
        },
      },
      tickAmount: props.yaxis.tickAmount,
      gridLineColor: '#e9e9e9',
      categories: props.yaxis.categories,
    },
    xAxis: {
      title: {
        text: props.xaxis.title,
        margin: 24,
        style: {
          color: '#000',
          fontSize: '0.8rem',
          fontWeight: '500',
          fontFamily: 'Poppins, sans-serif',
        },
      },
      accessibility: {
        rangeDescription: props.xaxis.title,
      },
      labels: {
        style: {
          color: '#44677b',
          fontSize: '0.6rem',
        },
      },
      categories: props.xaxis.categories,
      plotLines: props.xaxis.plotLines,
    },
    legend: {
      enabled: props.showLegend,
      layout: 'horizontal',
      verticalAlign: 'top',
      itemStyle: {
        color: '#96A8B9',
        fontSize: '0.8rem',
        fontWeight: '500',
        fontFamily: 'Poppins, sans-serif',
      },
      squareSymbol: false,
      symbolHeight: 3,
      symbolWidth: 32,
      y: -44,
      padding: 0,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: false,
          },
        },
        lineWidth: 2.4,
      },
    },
    series: props.data,
    credits: {
      enabled: false,
    },
  };
};
