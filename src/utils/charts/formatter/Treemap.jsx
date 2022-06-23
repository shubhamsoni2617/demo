export const treemapOptions = (props) => {
  return {
    chart: {
      height: props.height || '200px',
      spacing: [5, 5, 5, 5],
      events: {
        drilldown: function (e) {
          e.preventDefault();
        },
      },
      animation: false,
      borderColor: '#ffffff',
      margin: 0,
    },
    title: {
      text: '',
    },
    tooltip: {
      enabled: props.tooltip && props.tooltip.enable,
      useHTML: props.tooltip && props.tooltip.useHtml,
      backgroundColor: '#FFF',
      formatter: function () {
        return props.tooltip && props.tooltip.formatter(this.point);
      },
      outside: true,
    },
    plotOptions: {
      series: {
        animation: false,
        alternateStartingDirection: true,
        // layoutAlgorithm: 'strip',
        states: {
          hover: {
            borderWidth: 1,
            borderColor: '#fff',
          },
        },
      },
    },
    series: [
      {
        type: 'treemap',
        data: props.data,
        allowDrillToNode: false,
        allowTraversingTree: false,
        allowPointSelect: true,
        borderWidth: 4,
        borderColor: '#fff',
        name: props.seriesName,
        dataLabels: {
          enabled: true,
          useHTML: true,
          allowOverlap: true,
          formatter: function () {
            // Use this to set selected checkbox and locked Icon
            // See if on select, the gradient can be changed
            if (this.point.isLocked === true) {
              return `<div><img style="height:14px; width: 16px" src="/lock.png"></img><span>  ${this.point.name}</span></div>`;
            }
            return this.point.name;
          },
        },
      },
    ],
    drilldown: {
      series: [],
      drillUpButton: {
        position: {
          align: 'left',
          x: 10,
          y: 10,
        },
        theme: {
          fill: 'white',
          'stroke-width': 1,
          style: {
            color: '#44677b',
            fontSize: '11px',
          },
        },
      },
    },
    credits: {
      enabled: false,
    },
  };
};
