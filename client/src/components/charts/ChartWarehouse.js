import React, { useEffect, useState, useRef } from "react";
import Chartjs from "chart.js";

const ChartWarehouse = (props) => {
  const [chartState, setChartState] = useState(props);
  console.log(props);
  console.log(chartState);

  useEffect(() => {
    console.log(chartState);
  }, [chartState]);

  const warehouse = Object.values(props).pop();
  console.log(warehouse);
  const letters = Object.keys(props);
  const values = Object.values(props);

  letters.pop();
  values.pop();

  console.log(letters, values);

  const chartConfig = {
    type: "bar",
    data: {
      labels: letters,
      datasets: [
        {
          label: `Warehouse`,
          data: values,
          backgroundColor: [
            "rgba(249, 248, 113, 0.4)",
            "rgba(87, 120, 114, 0.4)",
          ],
          borderColor: ["rgba(249, 248, 113, 1)", "rgba(87, 120, 114, 1)"],
          // borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
        position: "left",
        labels: {
          fontColor: "rgb(85, 84, 84)",
        },
      },
      title: {
        display: true,
        text: `Warehouse# ${warehouse}`,
        position: "top",
      },
      layout: {
        padding: {
          left: 70,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  console.log("start create chart");
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // console.log(chartContainer);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartWarehouse;
