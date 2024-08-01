import { useState, EventHandler, ReactNode } from 'react';
import MenuBar from './MenuBar.js';
import './Environ.css';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Environ = () => {
  const data = [
    {
      name: '부서 1',
      num: 5,
    },
    {
      name: '부서 2',
      num: 3,
    },
    {
      name: '부서 3',
      num: 1,
    },
    {
      name: '부서 4',
      num: 2,
    },
    {
      name: '부서 5',
      num: 4,
    },
    {
      name: '부서 6',
      num: 2,
    },
  ];
  return (
    <>
      <MenuBar />
      <div className="envir_group_23">
        <div className="envir_rect_28">
          <div className="glance_temp">
            <span style={{ fontSize: '25px' }}>▽ </span>
            <span style={{ fontSize: '35px' }}>일별 온도</span>
          </div>
          <BarChart className="temp_chart" width={650} height={280} data={data}>
            <Bar dataKey="num" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
        <div className="envir_rect_31">
          <div className="glance_humi">
            <span style={{ fontSize: '20px' }}>▽ </span>
            <span style={{ fontSize: '35px' }}>일별 습도</span>
          </div>
          <BarChart className="temp_chart" width={650} height={280} data={data}>
            <Bar dataKey="num" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
        <div className="envir_rect_30">
          <div className="glance_illum">
            <span style={{ fontSize: '20px' }}>▽ </span>
            <span style={{ fontSize: '35px' }}>일별 조도</span>
          </div>
          <BarChart className="temp_chart" width={650} height={280} data={data}>
            <Bar dataKey="num" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
        <div className="envir_rect_29">
          <div className="glance_gas">
            <span style={{ fontSize: '20px' }}>▽ </span>
            <span style={{ fontSize: '35px' }}>일별 가스</span>
          </div>
          <BarChart className="temp_chart" width={650} height={280} data={data}>
            <Bar dataKey="num" fill="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart>
        </div>
      </div>
      <div className="envir_rect_27">
        <div className="envir_group_24">
          <div className="envir_20">20°C</div>
          <div className="envir_temp_emoji">🌡️</div>
        </div>
        <div className="envir_group_25">
          <div className="envir_14">14%</div>
          <div className="envir_water_emoji">💧</div>
        </div>
        <div className="envir_group_26">
          <div className="envir_80">80%</div>
          <div className="envir_light_imoji">💡</div>
        </div>
        <div className="envir_group_27">
          <div className="envir_0">0.0%</div>
          <div className="envir_hot_emoji">☣️</div>
        </div>
      </div>
      <div className="optimization_index">
        <div className="envir_rect_32"></div>
        <div className="envir_optimization_index">최적화 지수</div>
        <div className="envir_line_18"></div>
        <div className="envir_rect_33"></div>
        <div className="envir_100">100%</div>
      </div>
    </>
  );
};

export default Environ;
