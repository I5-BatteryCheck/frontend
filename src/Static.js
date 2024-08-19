import './Static.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setBatteryId } from './store.js';
import React, { useState, useEffect } from 'react';
import MenuBar from './MenuBar.js';
import GoalChart from './Chart/GoalChart.js';
import ProductionChart from './Chart/ProductionChart.js';
import DefectRateBarChart from './Chart/DefectRateBarChart.js';
import OperationTimeChart from './Chart/OperationTimeChart.js';
import DefectTypeChart from './Chart/DefectTypeChart.js';
import DefectRateChart from './Chart/DefectRateChart.js';

import StaticDefectRatio from './Chart/StaticDefectRatio.js';
const Static = () => {
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantity);
  const batteryId = useSelector((state) => state.batteryId); // batteryId를 Redux에서 가져오기
  const productionRatio = Math.floor((batteryId / quantity) * 100);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const response = await axios.get('http://52.79.89.88:8002/api/picture/web');
        if (response.data.success) {
          dispatch(setBatteryId(response.data.data.batteryId));
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching battery status:', error);
      }
    };

    fetchBatteryStatus(); // Initial fetch

    const intervalId = setInterval(fetchBatteryStatus, 1000); // Fetch every 1 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);

  //생산량 입력 받는 코드 끝
  return (
    <>
      <MenuBar />
      <div className="static_group_1">
        <div className="static_rectagle_5"></div>
        <div className="static_achive_status">달성 현황</div>
        <div className="static_344_1000">
          {batteryId} / {quantity}
        </div>
        <div className="static_34">
          {Number.isNaN(productionRatio) || productionRatio === Infinity || productionRatio === -Infinity
            ? '0%'
            : `${productionRatio}%`}
        </div>
        <GoalChart styleName={'static_image_4'} />
      </div>
      <DefectRateChart />
      <StaticDefectRatio />
      <ProductionChart />
      <OperationTimeChart />
      <DefectTypeChart />
      <DefectRateBarChart />
    </>
  );
};

export default Static;
