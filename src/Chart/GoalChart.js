import { useSelector } from 'react-redux';
import './../Static.css';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GoalChart = (props) => {
  const quantity = useSelector((state) => state.quantity);
  const batteryId = useSelector((state) => state.batteryId); // batteryId를 Redux에서 가져오기

  const rate = (batteryId / quantity) * 100;

  const data = {
    labels: ['Production rate', 'Remaining'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [rate, 100 - rate],
        backgroundColor: ['blue', 'white'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true, // tooltip 비활성화
      },
      datalabels: {
        display: false, // 데이터 레이블 비활성화
      },
      legend: {
        display: false, // Hide legend labels
      },
    },
  };

  return (
    <>
      <div style={{ width: '180px', height: '200px' }}>
        <Pie className={props.styleName} data={data} options={options} />
      </div>
    </>
  );
};

export default GoalChart;
