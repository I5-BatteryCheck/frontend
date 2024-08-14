import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import './../Static.css';

import axios from 'axios';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DefectRateChart = () => {
  const [defectRatio, setDefectRatio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('http://52.79.89.88:8002/api/battery/defectRatio'); // API 경로를 여기에 적어주세요
      const result = response.data;

      if (result.success) {
        setDefectRatio(result.data.defectRatio); // 'defectRatio' 데이터를 상태에 저장
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

    // const intervalId = setInterval(() => {
    //   fetchData(); // 5초마다 데이터 갱신
    // }, 5000);

    // 컴포넌트 언마운트 시 interval 정리
    // return () => clearInterval(intervalId);
  }, []);

  // 로딩 상태와 에러 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const data = {
    labels: ['불량비율', '정상비율'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [defectRatio, 100 - defectRatio],
        backgroundColor: ['red', 'blue'],
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
    },
  };

  return (
    <>
      <div className="static_group_2">
        <div className="static_rec_5_5"></div>
        <div className="static_rec_5_5"></div>
        <div className="static_fault_rate">생산량 대비 불량율</div>
        <div className="static_27">{defectRatio}%</div>
        <Pie className="static_image_3" data={data} options={options} />
      </div>
    </>
  );
};

export default DefectRateChart;
