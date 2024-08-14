import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import './../Static.css';
import axios from 'axios';

// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const StaticDefectRatio = () => {
  const [damaged, setDamaged] = useState('0.4');
  const [pollution, setPollution] = useState('0.5');
  const [both, setBoth] = useState('0.9');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('http://52.79.89.88:8002/api/defect/rate'); // API 경로를 여기에 적어주세요
      const result = response.data;

      let damaged = parseFloat(result.data.damaged) * 100;
      let pollution = parseFloat(result.data.pollution) * 100;
      let both = parseFloat(result.data.both) * 100;

      if (result.success) {
        setDamaged(damaged);
        setPollution(pollution);
        setBoth(both);
      } else {
        throw new Error('API 호출이 실패했습니다.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 5초마다 데이터 갱신
  useEffect(() => {
    fetchData(); // 처음 로드 시 데이터 가져오기

    const intervalId = setInterval(() => {
      fetchData(); // 2초마다 데이터 갱신
    }, 2000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(intervalId);
  }, []);

  // 로딩 상태와 에러 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Doughnut 차트 데이터 구성
  const data = {
    labels: ['파손', '오염', '복합'],
    datasets: [
      {
        label: '불량 비율',
        data: [damaged, pollution, both],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Doughnut 차트 옵션 설정
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <div className="static_group_3">
        <div className="static_rec_5_5_5">
          <div style={{ position: 'absolute', top: '5px', left: '240px', width: '250px', height: '240px' }}>
            <Doughnut data={data} options={options} />
          </div>
        </div>
        <div className="static_fault_rate_2">
          실시간 불량 비율
          <div className="static_fault_rate_2_1">
            <p>파손 : {damaged}%</p>
            <p>오염 : {pollution}%</p>
            <p>복합 : {both}%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticDefectRatio;
