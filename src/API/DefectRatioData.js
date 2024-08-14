import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setBatteryId } from '../store';

const ProductionData = () => {
  const dispatch = useDispatch();

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

    // const intervalId = setInterval(fetchBatteryStatus, 5000); // Fetch every 5 seconds

    // return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [dispatch]);

  return null; // 이 컴포넌트는 이제 UI를 렌더링하지 않음
};

export default ProductionData;
