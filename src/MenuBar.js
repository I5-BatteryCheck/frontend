import { useState, EventHandler, ReactNode } from 'react';
import './MenuBar.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const MenuBar = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="static_home_back">
        <div className="static_nav_bar">
          <div className="static_rectagle_1"></div>
          <div>
            <button
              className="static_bar_button2"
              onClick={() => {
                navigate('/');
              }}
            >
              생산관리
            </button>
          </div>
          <div>
            <button
              className="static_bar_button3"
              onClick={() => {
                navigate('/static');
              }}
            >
              통계
            </button>
          </div>
          <div>
            <button
              className="static_bar_button4"
              onClick={() => {
                navigate('/search');
              }}
            >
              조회
            </button>
          </div>
          <div>
            <button
              className="static_bar_button1"
              onClick={() => {
                navigate('/environment');
              }}
            >
              생산환경
            </button>
          </div>
          <div className="static_rectagle_2"></div>
          <div className="static_rectagle_3"></div>
          <div>
            <button className="static_login">로그인</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBar;
