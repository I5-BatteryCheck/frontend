import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Production.css';

const ResultImagePrint = () => {
  const [pictures, setPictures] = useState([]);
  const [result, setResult] = useState('');
  const [localDate, setLocalDate] = useState(''); // 날짜를 저장할 상태
  const [localTime, setLocalTime] = useState(''); // 시간을 저장할 상태
  const [type, setType] = useState([]);

  useEffect(() => {
    const fetchPictures = () => {
      axios
        .get('http://52.79.89.88:8002/api/picture/web')
        .then((response) => {
          if (response.data.success) {
            setPictures(response.data.data.pictures);
            setResult(response.data.data.result);

            const dateTime = response.data.data.localDateTime;
            const [date, time] = dateTime.split('T'); // 'T'를 기준으로 날짜와 시간을 분리
            setLocalDate(date); // 날짜 저장
            setLocalTime(time.split('.')[0]); // 시간을 저장 (초 단위까지만, 밀리초 제외)

            setType(response.data.data.type);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchPictures(); // 초기 데이터 로딩

    const intervalId = setInterval(fetchPictures, 1000); // 1초마다 데이터 요청

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div>
        {/* <div className="produc_cam_3">검사정보</div> */}
        <div className="result-container">
          <div className="result-section">
            <h2>검사날짜</h2>
            <p style={{ fontSize: '23px', fontWeight: 'bold' }}>{localDate}</p>
          </div>
          <div className="result-section">
            <h2>검사시간</h2>
            <p style={{ fontSize: '23px', fontWeight: 'bold' }}>{localTime}</p>
          </div>
          <div className="result-section">
            <h2>판정결과</h2>
            <p style={{ fontSize: '23px', fontWeight: 'bold' }}>{result}</p>
          </div>
          <div className="result-section">
            <h2>결함유형</h2>
            <p style={{ fontSize: '23px', fontWeight: 'bold' }}>
              {type[0]} <br /> {type[1]}
            </p>
          </div>
        </div>

        <div className="produc_cam_1_1">검사결과1</div>
        <img className="produc_rectangle_10" src={`data:image/jpeg;base64,${pictures[0]}`} />
        <div className="produc_cam_1_2">검사결과2</div>
        <img className="produc_rectangle_12" src={`data:image/jpeg;base64,${pictures[1]}`} />
        <div className="produc_cam_1_3">검사결과3</div>
        <img className="produc_rectangle_14" src={`data:image/jpeg;base64,${pictures[2]}`} />
      </div>
    </div>
  );
};

export default ResultImagePrint;
