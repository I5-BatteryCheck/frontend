import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './../Static.css';

// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GasChart = () => {
  // 상태 변수 선언
  const [localDate, setLocalDate] = useState([]);
  const [gas, setGas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오기 함수
  const fetchProductionRatio = async () => {
    try {
      const response = await axios.get('http://52.79.89.88:8002/api/battery/condition/date'); // API 경로를 여기에 적어주세요
      const result = response.data;

      if (result.success) {
        console.log(result);
        // 데이터 변환
        const dates = result.data.map((item) => item.localDate);
        const gas = result.data.map((item) => item.gas);

        setLocalDate(dates);
        setGas(gas);
      } else {
        throw new Error('API 호출이 실패했습니다.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 데이터 가져오기
  useEffect(() => {
    fetchProductionRatio();
  }, []);

  // 로딩 상태와 에러 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = {
    labels: localDate,
    datasets: [
      {
        label: '최근 5일 간의 공장 가스',
        data: gas,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
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
      <div className="envir_rect_30">
        <div className="glance_illum">
          <span style={{ fontSize: '35px' }}>일별 가스</span>
        </div>
      </div>
      <div className="illuminance_chart">
        <Bar data={data} options={options} />
      </div>
    </>
  );
};

export default GasChart;
