import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './../Static.css';
import './../Environ.css';
import BrushBarChart from './BrushBarChart';
// Chart.js에 필요한 컴포넌트를 등록합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VibrationChart = () => {
  // 상태 변수 선언
  const [localDate, setLocalDate] = useState([]);
  const [gas, setGas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      <div className="envir_rect_29">
        <div className="glance_gas">
          <span style={{ fontSize: '35px' }}>실시간 진동</span>
        </div>
      </div>
      <div className="gas_chart">
        <BrushBarChart />
      </div>
    </>
  );
};

export default VibrationChart;
