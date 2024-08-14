import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './../Static.css';

const OperationTimeChart = () => {
  const [frequencies, setFrequencies] = useState([]);
  const [fftMagnitude, setFftMagnitude] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://52.79.89.88:8002/api/pulse/retrieve'); // 라즈베리파이의 IP 및 엔드포인트에 맞게 수정
        const data = response.data;
        console.log(data);
        setFrequencies(data.data.frequencies);
        setFftMagnitude(data.data.magnitudes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 초기 데이터 로드
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 처음 마운트될 때만 실행

  const data = frequencies.map((frequency, index) => ({
    frequency,
    magnitude: fftMagnitude[index],
  }));

  return (
    <>
      <div className="static_group_7">
        <div className="static_rectagle_19_1"></div>
        <div className="operation_time_chart">
          <ResponsiveContainer width={570} height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="frequency" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="magnitude" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="static_acitve_time">전일 진동 평균</div>
      </div>
    </>
  );
};

export default OperationTimeChart;
