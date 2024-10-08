import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { start, pause, reset, tick, setBatteryId } from './store';
import axios from 'axios';

const formatTime = (time) => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = Math.floor(time / 60);
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours}:${getMinutes}:${getSeconds}`;
};

const Stopwatch = () => {
  const dispatch = useDispatch();
  const { time, isActive } = useSelector((state) => state.stopwatch);
  const countRef = useRef(null);

  const quantity = useSelector((state) => state.quantity);
  const batteryId = useSelector((state) => state.batteryId);

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

  useEffect(() => {
    if (isActive) {
      countRef.current = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    return () => clearInterval(countRef.current);
  }, [isActive, dispatch]);

  useEffect(() => {
    if (quantity === batteryId && isActive) {
      clearInterval(countRef.current);
      dispatch(pause());
    }
  }, [quantity, batteryId, isActive, dispatch]);

  const handleStart = () => {
    dispatch(start());
  };

  const handlePause = () => {
    clearInterval(countRef.current);
    dispatch(pause());
  };

  const handleReset = () => {
    clearInterval(countRef.current);
    dispatch(reset());
  };

  return (
    <div>
      <div>
        <div className="produc_active_time">
          <div className="produc_rectangle_6">
            <div className="produc_time_active">작동시간</div>
          </div>
          <div className="produc_active_time_0">{formatTime(time)}</div>
        </div>
        {!isActive ? (
          <button className="produc_start" onClick={handleStart}>
            시작
          </button>
        ) : (
          <button className="produc_start" onClick={handlePause}>
            중지
          </button>
        )}
        <button className="produc_end" onClick={handleReset}>
          초기화
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
