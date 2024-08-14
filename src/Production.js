import { useState, useEffect } from 'react';
import './Production.css';
import MenuBar from './MenuBar.js';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setQuantity, setBatteryId } from './store';

import GoalChart from './Chart/GoalChart.js';
import ResultImagePrint from './ResultImagePrint.js';
import MainDefectChart from './Chart/MainDefectChart.js';

import Stopwatch from './StopWatch.js';
import ProductionData from './API/ProductionData.js';

const Production = () => {
  const dispatch = useDispatch();
  const batteryId = useSelector((state) => state.batteryId);
  const quantity = useSelector((state) => state.quantity);

  const [imageUrl_1, setImageUrl_1] = useState('http://192.168.137.62:5010/monitor/0');

  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [gas, setGas] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [inputQuantity, setInputQuantity] = useState(quantity);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('body-modal-active');
    } else {
      document.body.classList.remove('body-modal-active');
    }
  }, [showModal]);

  useEffect(() => {
    const updateImage = () => {
      const timestamp = new Date().getTime();
      setImageUrl_1(`http://192.168.137.51:5010/monitor/0?timestamp=${timestamp}`);
    };

    const intervalId = setInterval(updateImage, 400);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.137.51:5010/sensor_value');
        const data = response.data;
        setTemp(data.Temperature);
        setHumidity(data.humidity);
        setLightLevel(data.lightLevel);
        const gas = parseFloat(data.gas); // 문자열을 부동 소수점 숫자로 변환
        const result = ((gas / 4500) * 100).toFixed(1); // 변환된 값을 사용하여 계산
        setGas(result);

        if (data.Temperature > 28) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 200);
    return () => clearInterval(intervalId);
  }, []);

  const productionRatio = Math.floor((batteryId / quantity) * 100);

  const handleChange = (e) => {
    setInputQuantity(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuantity(inputQuantity));
  };

  return (
    <>
      <MenuBar />
      <div className="produc_camera_container">
        <div className="produc_rectangle_4"></div>
        <div className="produc_cam_2">실시간 모니터링</div>
        <div className="produc_rectangle_11">
          <img src={imageUrl_1} className="cam1_img" alt="Dynamic from Flask" />
        </div>
        <ResultImagePrint />
      </div>
      {quantity != batteryId ? (
        <form onSubmit={handleSubmit}>
          <div className="produc_goal">
            <div className="produc_rectangle_8"></div>
            <div className="produc_goal_sentence">
              목표:
              <input
                onChange={handleChange}
                type="number"
                id="quantity"
                name="quantity"
                className="custom-input"
                value={inputQuantity}
              />
            </div>
            <ProductionData />
            <button type="submit" className="produc_rectangle_16">
              입력
            </button>
          </div>
        </form>
      ) : (
        <div className="produc_goal">
          <div className="produc_rectangle_8">
            <Goal_complete />
          </div>
        </div>
      )}
      <Stopwatch />
      <div className="produc_achieve_state">
        <div className="produc_rectangle_5"></div>
        <div className="produc_achieve_state_2">달성 현황</div>
        <div className="produc_34">
          {Number.isNaN(productionRatio) || productionRatio === Infinity || productionRatio === -Infinity
            ? '0%'
            : `${productionRatio}%`}
        </div>
        <GoalChart styleName={'produc_goal_chart'} />
      </div>
      <div className="proudc_fault_rate">
        <div className="produc_rectangle_7"></div>
        <div className="proudc_fault_rate_2">불량 비율</div>
        <MainDefectChart />
      </div>
      <div className="produc_environment">
        <div className="produc_rectangle_9"></div>
        <div className="produc_temperature">온도: {temp}°C</div>
        <div className="produc_air">가스: {gas}%</div>
        <div className="produc_illuminance">조도: {lightLevel}lx</div>
        <div className="produc_humidity">습도: %{humidity}</div>
      </div>
      {showModal && <Modal />}
    </>
  );
};

function Modal() {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>온도 최적화 중입니다.</h3>
      </div>
    </div>
  );
}

function Goal_complete() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>✅</h1>
      <h3>달성완료</h3>
    </div>
  );
}

export default Production;
