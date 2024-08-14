import { useState, EventHandler, ReactNode } from 'react';
import MenuBar from './MenuBar.js';
import './Environ.css';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import HumidityTemperatureChart from './Chart/HumidityTemperatureChart.js';

import IlluminanceChart from './Chart/IlluminanceChart.js';
import FetchRealTimeData from './API/FetchRealTimeData.js';

import EfficiencyChart from './Chart/EfficiencyChart.js';

import VibrationChart from './Chart/VibrationChart.js';
import GasChart from './Chart/GasChart.js';
const Environ = () => {
  return (
    <>
      <MenuBar />
      <div className="envir_group_23">
        <HumidityTemperatureChart />
        <IlluminanceChart />
        <GasChart />
        <VibrationChart />
      </div>
      <FetchRealTimeData />
      <EfficiencyChart />
    </>
  );
};

export default Environ;
