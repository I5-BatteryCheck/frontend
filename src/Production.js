import { useState, EventHandler, ReactNode, useEffect, useCallback } from 'react';
import './Production.css';
import MenuBar from './MenuBar.js';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setQuantity } from './store';
const Production = () => {
  //이미지 url 0.5초 새로고침 코드
  const [imageUrl, setImageUrl] = useState('http://192.168.137.51:5010/monitor/*');

  useEffect(() => {
    const updateImage = () => {
      const timestamp = new Date().getTime();
      setImageUrl(`http://192.168.68.253:5010/?timestamp=${timestamp}`);
    };

    // const intervalId = setInterval(updateImage, 500); // 500ms = 0.5 seconds

    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  //라즈베리파이에서 온도,습도,조도,가스 받아오는 코드 시작
  const [temp, setTemp] = useState('');
  const [humidity, setHumidity] = useState('');
  const [lightLevel, setLightLevel] = useState('');
  const [gas, setGas] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.137.51:5010/sensor_value'); // 라즈베리파이의 IP 및 엔드포인트에 맞게 수정
        const data = response.data;
        setTemp(data.Temperature);
        setHumidity(data.humidity);
        setLightLevel(data.lightLevel);
        setGas(data.gas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // 초기 데이터 로드

    // const intervalId = setInterval(fetchData, 10000); // 5초마다 데이터 갱신

    // return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  //라즈베리에서 온습도 코드 끝

  //목표현황 입력 받는 코드
  const dispatch = useDispatch();
  const quantity = useSelector((state) => state.quantity);

  const handleChange = (e) => {
    dispatch(setQuantity(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuantity(quantity));
  };
  //목표현황 입력 받는 코드 끝

  //스프링에 생산량 받는 코드
  const [batteryId, setBatteryId] = useState(null);

  useEffect(() => {
    const fetchBatteryStatus = async () => {
      try {
        const response = await axios.get('http://52.79.89.88:8002/api/picture/web');
        if (response.data.success) {
          setBatteryId(response.data.data.batteryId);
          console.log(response);
        }
      } catch (error) {
        console.error('Error fetching battery status:', error);
      }
    };

    fetchBatteryStatus(); // Initial fetch

    // const intervalId = setInterval(fetchBatteryStatus, 5000); // Fetch every 5 seconds

    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  //스프링에서 생산량 받는 코드 끝
  return (
    <>
      <MenuBar />
      <div className="produc_camera_container">
        <div className="produc_rectangle_4">4</div>
        <div className="produc_rectangle_10">10</div>
        <div className="produc_rectangle_11">
          11
          <img src={imageUrl} className="cam1_img" alt="Dynamic from Flask" />
        </div>
        <div className="produc_rectangle_13">13</div>
        <div className="produc_rectangle_12">12</div>
        <div className="produc_rectangle_14">14</div>
        <div className="produc_rectangle_15">15</div>
        <div className="produc_cam_1">CAM_1</div>
        <div className="produc_cam_2">CAM_2</div>
        <div className="produc_cam_3">CAM_3</div>
        <div className="produc_cam_1_1">CAM_1_1</div>
        <div className="produc_cam_1_2">CAM_1_2</div>
        <div className="produc_cam_1_3">CAM_1_3</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="produc_goal">
          <div className="produc_rectangle_8"></div>
          <div className="produc_goal_sentence">
            목표:
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="custom-input"
              value={quantity}
              onChange={handleChange}
            />
          </div>
          <div className="produc_achieve_sentence"> 생산량 : {batteryId}</div>
          <input type="submit" value="입력" className="produc_rectangle_16"></input>
        </div>
      </form>
      <div className="produc_active_time">
        <div className="produc_rectangle_6"></div>
        <div className="produc_active_time_0"></div>
      </div>
      <div className="produc_start"></div>
      <div className="produc_end"></div>
      <div className="produc_achieve_state">
        <div className="produc_rectangle_5"></div>
        <div className="produc_achieve_state_2">달성 현황</div>
        <div className="produc_34">34.4%</div>
        <img className="produc_image_3" width="129" height="134" src="image 316_160.png"></img>
      </div>
      <div className="proudc_fault_rate">
        <div className="produc_rectangle_7"></div>
        <div className="proudc_fault_rate_2">불량 비율</div>
        <div className="produc_rectangle_17"></div>
        <div className="produc_rectangle_18"></div>
        <div className="produc_70">70%</div>
        <div className="produc_30">30%</div>
      </div>
      <div className="produc_environment">
        <div className="produc_rectangle_9"></div>
        <div className="produc_temperature">온도: {temp}</div>
        <div className="produc_air">대기: {humidity}</div>
        <div className="produc_illuminance">조도: {lightLevel}</div>
        <div className="produc_humidity">가스: {gas}</div>
      </div>
    </>
  );
};

export default Production;
