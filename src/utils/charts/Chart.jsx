import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsTreeChart from 'highcharts/modules/treemap';
import Drilldown from 'highcharts/modules/drilldown';
import { lineChartOptions } from './formatter/LineChart';
import { lineChartPerformanceOptions } from './formatter/LineChartPerformance';
import { stepChartOptions } from './formatter/StepChart';

import { barChartOptions } from './formatter/BarChart';
import { treemapOptions } from './formatter/Treemap';
import _ from 'lodash';
import './Chart.scss';
import { lineChartAreaOptions } from './formatter/LineChartArea';
import { stepAreaChartOptions } from './formatter/StepArea';

const Chart = (props) => {
  let options = [];
  switch (props.chartType) {
    case 'linechart-performance':
      options = lineChartPerformanceOptions(_.cloneDeep(props));
      break;
    case 'linechart-area':
      options = lineChartAreaOptions(_.cloneDeep(props));
      break;
    case 'linechart':
      options = lineChartOptions(_.cloneDeep(props));
      break;
    case 'barchart':
      options = barChartOptions(_.cloneDeep(props));
      break;
    case 'step':
      options = stepChartOptions(_.cloneDeep(props));
      break;
    case 'step-area':
      options = stepAreaChartOptions(_.cloneDeep(props));
      break;
    case 'treemap':
      options = treemapOptions(_.cloneDeep(props));
      break;
    default:
      break;
  }
  if (props.chartType === 'treemap') {
    HighchartsTreeChart(Highcharts);
  }

  Drilldown(Highcharts);
  Highcharts.setOptions({
    lang: {
      drillUpText: 'Back to {series.name}',
    },
  });

  if (props.drilldown || props.select) {
    /* Selected points - stores id of selected items. Store full objects if need be */
    (function (H) {
      H.addEvent(H.Chart, 'load', function (e) {
        /* Storing selectedPoints locally to support multiple selection */
        let selectedPoints = [];
        /* Custom Select event */
        if (props.select) {
          var chart = e.target;
          H.addEvent(chart.container, 'click', function (e) {
            e = chart.pointer.normalize(e);
            if (e.point && e.point.id) {
              if (selectedPoints.includes(e.point.id)) {
                const index = selectedPoints.indexOf(e.point.id);
                if (index > -1) {
                  selectedPoints.splice(index, 1); // 2nd parameter means remove one item only
                }
              } else {
                selectedPoints.push(e.point.id);
              }

              // Send selected items to parent component
              props.setSelectedItems && props.setSelectedItems(e.point.id);

              var points = chart.series[0].data;
              points
                .filter((elem) => {
                  return selectedPoints.includes(elem.id);
                })
                .forEach((point) => {
                  point.select(true, true);
                });
            }
          });
        }

        /* Custom drilldown event */
        if (props.drilldown) {
          H.addEvent(chart.container, 'dblclick', function (e) {
            e = chart.pointer.normalize(e);
            const selectedPoint = e.target.point
              ? {
                  id: e.target.point.id,
                  name: e.target.point.name,
                }
              : {};
            props.handleDrilldown && props.handleDrilldown(selectedPoint);
          });
        }
      });
    })(Highcharts);
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
