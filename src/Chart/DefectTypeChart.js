import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './../Static.css';

// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DefectTypeChart = () => {
  const [localDate, setLocalDate] = useState([]);
  const [pollution, setPollution] = useState([]);
  const [damaged, setDamaged] = useState([]);
  const [both, setBoth] = useState([]);

  useEffect(() => {
    // 스프링 서버의 엔드포인트로 GET 요청을 보냅니다.
    axios
      .get('http://52.79.89.88:8002/api/defect/date')
      .then((response) => {
        const data = response.data.data; // response.data가 { success: true, data: [...] } 형태일 경우

        // 받은 데이터를 상태 변수에 저장합니다.
        const pollutionData = data.map((item) => item.pollution);
        const damagedData = data.map((item) => item.damaged);
        const bothData = data.map((item) => item.both);
        const localDate = data.map((item) => item.localDate);

        setLocalDate(localDate);
        setPollution(pollutionData);
        setDamaged(damagedData);
        setBoth(bothData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행되게 합니다.

  const labels = localDate; // 직접 입력된 labels
  const data = {
    labels: labels,
    datasets: [
      {
        label: '오염',
        data: pollution,
        fill: false,
        borderColor: 'red',
        tension: 0.1,
      },
      {
        label: '파손',
        data: damaged,
        fill: false,
        borderColor: 'blue',
        tension: 0.1,
      },
      {
        label: '복합',
        data: both,
        fill: false,
        borderColor: 'yellow',
        tension: 0.1,
      },
    ],
  };

  const options = {
    type: 'line',
    data: data,
    plugins: {
      tooltip: {
        enabled: true, // tooltip 비활성화
      },
      datalabels: {
        display: false, // datalabels 비활성화
      },
    },
  };

  return (
    <>
      <div className="static_group_6">
        <div className="static_rectagle_19_2"></div>
        <div className="static_fault_type">불량 유형</div>
        <div className="static_image_1_1_1">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default DefectTypeChart;
