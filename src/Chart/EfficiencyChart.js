import { useState, EventHandler, ReactNode, useEffect, useCallback } from 'react';
import './../Environ.css';
import axios from 'axios';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './../Static.css';

// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, ChartDataLabels, Title, Tooltip, Legend);

const EfficiencyChart = () => {
  //라즈베리파이에서 온도,습도,조도,가스 받아오는 코드 시작
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [gas, setGas] = useState('');

  const [example, setExample] = useState(70);
  let optimization = 100;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.137.51:5010/sensor_value'); // 라즈베리파이의 IP 및 엔드포인트에 맞게 수정
        const data = response.data;
        setTemp(data.Temperature);
        setHumidity(data.humidity);
        setLightLevel(data.lightLevel);
        const gas = parseFloat(data.gas); // 문자열을 부동 소수점 숫자로 변환
        const result = ((gas / 4500) * 100).toFixed(1); // 변환된 값을 사용하여 계산
        setGas(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 초기 데이터 로드

    const intervalId = setInterval(fetchData, 200); // ..2초마다 데이터 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  //라즈베리에서 온습도 코드 끝

  if (temp > 28) {
    optimization -= 25;
  }

  if (humidity > 75) {
    optimization -= 25;
  }

  if (lightLevel < 2000 && lightLevel > 4000) {
    optimization -= 25;
  }

  if (gas > 40) {
    optimization -= 25;
  }

  const data = {
    labels: ['최적화 지수'], // 레이블
    datasets: [
      {
        label: 'Percentage',
        data: [optimization], // example 값, 퍼센트로 표시
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // 배경 색상
        borderColor: 'rgb(255, 99, 132)', // 테두리 색상
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ' + context.raw + '%'; // 퍼센트로 툴팁 표시
            }
            return label;
          },
        },
      },
      datalabels: {
        display: true,
        align: 'end', // 막대 위에 표시
        anchor: 'end', // 막대 위에 레이블을 붙이기 위해 끝에 고정
        formatter: function (value) {
          return value + '%'; // 예: 40%
        },
        color: 'black',
        font: {
          size: 25, // 폰트 크기 설정 (예: 16px)
        }, // 레이블 색상
      },
    },
    scales: {
      x: {
        display: false, // X축 숨기기
        grid: {
          display: false, // X축의 그리드 라인 숨기기
        },
      },
      y: {
        display: false, // Y축 숨기기
        grid: {
          display: false, // Y축의 그리드 라인 숨기기
        },
        min: 0, // Y축 최소값 0으로 설정
        max: 110, // Y축 최대값 100으로 설정
      },
    },
  };

  return (
    <>
      <div className="optimization_index">
        <div className="envir_rect_32"></div>
        <div className="envir_optimization_index">최적화 지수</div>
        <div className="envir_line_18"></div>
        <div className="envir_100">
          <Bar data={data} options={options} style={{ width: '150px', height: '500px' }} />
        </div>
      </div>
    </>
  );
};

export default EfficiencyChart;
