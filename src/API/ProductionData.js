import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBatteryId } from '../store';

const ProductionData = () => {
  const dispatch = useDispatch();
  const batteryId = useSelector((state) => state.batteryId); // batteryId를 Redux에서 가져오기
  //생산량 입력 받는 코드 시작

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
      <div className="produc_achieve_sentence">
        생산량 : <span style={{ marginLeft: '21px' }}>{batteryId}</span>
      </div>
    </>
  );
};

export default ProductionData;
