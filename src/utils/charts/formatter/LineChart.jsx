export const lineChartOptions = (props) => {
	return {
		chart: {
			type: "line",
			height: props.height,
			spacing: [20, 10, 10, 5],
			backgroundColor: "#F5F8FA",
			plotBackgroundColor: "#ffffff",
			ignoreHiddenSeries: false,
		},
		title: {
			text: props.title,
		},
		yAxis: {
			title: {
				text: props.yaxis.title,
				style: {
					color: "#44677b",
					fontSize: "0.7rem",
					fontWeight: "600",
				},
			},
			labels: {
				style: {
					color: "#44677b",
					fontSize: "0.6rem",
				},
			},
			tickAmount: props.yaxis.tickAmount,
			gridLineColor: "#e9e9e9",
			categories: props.yaxis.categories,
		},
		xAxis: {
			accessibility: {
				rangeDescription: props.xaxis.title,
			},
			labels: {
				style: {
					color: "#44677b",
					fontSize: "0.6rem",
				},
			},
			categories: props.xaxis.categories,
			plotLines: props.xaxis.plotLines,
		},
		legend: {
			enabled: props.showLegend,
			layout: "horizontal",
			itemStyle: {
				color: "#44677b",
				fontSize: "0.7rem",
				fontWeight: "600",
			},
			itemCheckboxStyle: {
				position: "absolute",
				width: "12px",
				height: "12px",
			},
			padding: 0,
			itemMarginTop: 4,
			itemMarginBottom: 2,
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
				lineWidth: 1.5,
			},
		},
		series: props.data,
		credits: {
			enabled: false,
		},
	};
};
