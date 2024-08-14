import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const BrushBarChart = () => {
  const [frequencies, setFrequencies] = useState([]);
  const [fftMagnitude, setFftMagnitude] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.137.51:5010/sensor_value'); // 라즈베리파이의 IP 및 엔드포인트에 맞게 수정
        const data = response.data;
        console.log(data);
        setFrequencies(data.frequencies);
        setFftMagnitude(data.fft_magnitude);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 초기 데이터 로드

    const intervalId = setInterval(fetchData, 2000); // 2초마다 데이터 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []); // 빈 배열을 의존성으로 전달하여 컴포넌트가 처음 마운트될 때만 실행

  const data = frequencies.map((frequency, index) => ({
    frequency,
    magnitude: fftMagnitude[index],
  }));

  return (
    <ResponsiveContainer width={650} height={280}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 40,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="frequency" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="magnitude" fill="#8884d8" />
        <Brush dataKey="frequency" height={10} stroke="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BrushBarChart;
