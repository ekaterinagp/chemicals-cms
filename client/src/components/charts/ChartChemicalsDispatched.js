import React, { useEffect, useState, useRef } from "react";
import Chartjs from "chart.js";

const ChartChemicalsDispatched = (props) => {
  const [chartState, setChartState] = useState(props);

  console.log(props);
  // console.log(chartState);

  useEffect(() => {
    console.log(chartState);
  }, [chartState]);

  let total = Object.values(props).pop();
  console.log(total);
  const letters = Object.keys(props);
  const values = Object.values(props);
  console.log(letters);
  letters.pop();
  letters.pop();
  values.pop();
  values.pop();
  console.log(letters, values);

  const chartConfig = {
    type: "pie",
    data: {
      labels: letters,
      datasets: [
        {
          label: `Total`,
          data: values,
          backgroundColor: [
            "rgba(249, 248, 113, 0.4)",
            "rgba(87, 120, 114, 0.4)",
            "rgba(181, 221, 123, 0.4)",
          ],
          borderColor: [
            "rgba(249, 248, 113, 1)",
            "rgba(87, 120, 114, 1)",
            "rgba(181, 221, 123, 1)",
          ],
        },
      ],
    },
    options: {
      legend: {
        display: true,
        position: "left",
        labels: {
          fontColor: "rgb(85, 84, 84)",
        },
      },
      title: {
        display: true,
        text: `Total ${total} ku`,
        position: "bottom",
      },
      layout: {
        padding: {
          left: 50,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    },
  };

  const chartContainer = useRef(null);

  const [chartInstance, setChartInstance] = useState(null);
  const updateDataset = (datasetIndex, newData, total) => {
    if (chartInstance) {
      chartInstance.config.data.datasets[datasetIndex].data = newData;
      chartInstance.config.options.title.text = `Total ${total} ku`;
      chartInstance.update();
    }
  };
  updateDataset(0, values, total);
  console.log(chartInstance);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ChartChemicalsDispatched;
