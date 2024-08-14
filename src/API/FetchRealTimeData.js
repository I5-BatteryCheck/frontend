import { useState, EventHandler, ReactNode, useEffect, useCallback } from 'react';
import './../Environ.css';
import axios from 'axios';

const FetchRealTimeData = () => {
  //라즈베리파이에서 온도,습도,조도,가스 받아오는 코드 시작
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [gas, setGas] = useState('');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('body-modal-active');
    } else {
      document.body.classList.remove('body-modal-active');
    }
  }, [showModal]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.137.51:5010/sensor_value'); // 라즈베리파이의 IP 및 엔드포인트에 맞게 수정
        const data = response.data;
        setTemp(data.Temperature);
        setHumidity(data.humidity);
        setLightLevel(data.lightLevel);
        setGas(data.gas);

        if (data.gas > 40) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 초기 데이터 로드

    const intervalId = setInterval(fetchData, 200); // 0.2초마다 데이터 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  //라즈베리에서 온습도 코드 끝

  return (
    <>
      <div className="envir_rect_27">
        <div className="envir_group_24">
          {temp > 28 ? (
            <div className="envir_20_1">
              🌡️
              <br />
              {temp}°C
            </div>
          ) : (
            <div className="envir_20">
              🌡️
              <br />
              {temp}°C
            </div>
          )}
        </div>
        <div className="envir_group_25">
          {humidity > 75 ? (
            <div className="envir_14_1">
              💧
              <br />
              {humidity}%
            </div>
          ) : (
            <div className="envir_14">
              💧
              <br />
              {humidity}%
            </div>
          )}
        </div>
        <div className="envir_group_26">
          {lightLevel <= 2000 || lightLevel > 4000 ? (
            <div className="envir_80">
              💡
              <br />
              {lightLevel}lx
            </div>
          ) : (
            <div className="envir_80_1">
              💡
              <br />
              {lightLevel}lx
            </div>
          )}
        </div>
        <div className="envir_group_27">
          {gas > 40 ? (
            <div className="envir_0_1">
              ☣️
              <br />
              {gas}%
            </div>
          ) : (
            <div className="envir_0">
              ☣️
              <br />
              {gas}%
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal />}
    </>
  );
};

function Modal() {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1 style={{ textAlign: 'center' }}>⚠️긴급 경고⚠️</h1>
        <h3 style={{ textAlign: 'center' }}>현재 공장에서 가스 누출이 감지되었습니다.</h3>
        <h3 style={{ textAlign: 'center' }}>안전을 위해 즉시 대피하십시오.</h3>
      </div>
    </div>
  );
}

export default FetchRealTimeData;
