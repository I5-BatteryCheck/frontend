import { useState, EventHandler, ReactNode } from 'react';
import './Static.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MenuBar from './MenuBar.js';
const Static = () => {
  const quantity = useSelector((state) => state.quantity);

  return (
    <>
      <MenuBar />
      <div className="static_group_1">
        <div className="static_rectagle_5"></div>
        <div className="static_achive_status">달성 현황</div>
        <div className="static_344_1000">344 / {quantity}</div>
        <div className="static_34">34.4%</div>
        <img className="static_image_4"></img>
      </div>
      <div className="static_group_2">
        <div className="static_rec_5_5"></div>
        <div className="static_fault_rate">불량율</div>
        <div className="static_27">27.5%</div>
        <img className="static_image_3"></img>
      </div>
      <div className="static_group_3">
        <div className="static_rec_5_5_5"></div>
        <div className="static_fault_rate_2">불량 비율</div>
        <div className="static_rectagle_20"></div>
        <div className="static_rectagle_21"></div>
        <div className="static_rectagle_22"></div>
        <div className="static_damaged">파손</div>
        <div className="static_pollution">오염</div>
        <div className="static_mix">복합</div>
      </div>
      <div className="static_group_4">
        <div className="static_rectagle_19"></div>
        <img className="static_image_1"></img>
        <div className="static_output_rate">생산량</div>
      </div>
      <div className="static_group_7">
        <div className="static_rectagle_19_1"></div>
        <img className="static_image_1_1"></img>
        <div className="static_acitve_time">동작 시간</div>
      </div>
      <div className="static_group_6">
        <div className="static_rectagle_19_2"></div>
        <div className="static_fault_type">불량 유형</div>
        <img className="static_img_2"></img>
      </div>
      <div className="static_group_5">
        <div className="static_rectagle_19_3"></div>
        <div className="static_fault_rate_3">불량률</div>
        <img className="static_image_1_1_1"></img>
      </div>
    </>
  );
};

export default Static;
