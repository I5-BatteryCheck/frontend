import { useState, EventHandler, ReactNode, useEffect } from 'react';
import MenuBar from './MenuBar.js';
import './Search.css';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type/index.js';

import CloseButton from 'react-bootstrap/CloseButton';
const Search = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    results: [],
    types: [],
    cameraNumber: [],
  });

  const [responseData, setResponseData] = useState([]);

  const [pictureId, setPictureId] = useState([]);
  const [batteryId, setBatteryId] = useState([]);
  const [testDate, setTestDate] = useState([]);
  const [testTime, setTestTime] = useState([]); // 추가된 상태 변수
  const [result, setResult] = useState([]);
  const [type, setType] = useState([]);
  const [cameraNumber, setCameraNumber] = useState([]);
  const [damagedLevel, setDamagedLevel] = useState([]);
  const [pollutionLevel, setPollutionLevel] = useState([]);
  const [image, setImage] = useState([]);

  const [modal, setModal] = useState({ visible: false, index: null });

  const closeModal = () => {
    setModal({ visible: false, index: null });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const query = new URLSearchParams(formData).toString();
      const response = await axios.get(`http://52.79.89.88:8002/api/picture/statistics?${query}`);
      const data = response.data.data;

      setResponseData(data);

      // Extracting data into separate arrays
      const pictureIds = data.map((item) => item.pictureId);
      const batteryIds = data.map((item) => item.batteryId);
      const testDates = data.map((item) => item.testDate.split('T')[0]); // 날짜만 추출
      const testTimes = data.map((item) => item.testDate.split('T')[1].split('.')[0]); // 시간만 추출
      const results = data.map((item) => {
        if (item.result === 'NORMAL') {
          return '정상';
        } else if (['POLLUTION', 'DAMAGED', 'BOTH'].includes(item.result)) {
          return '불량';
        } else {
          return item.result; // 이외의 값은 그대로 유지
        }
      });
      const types = data.map((item) => item.type);
      const cameraNumbers = data.map((item) => item.cameraNumber);
      const damagedLevels = data.map((item) => item.damagedLevel);
      const pollutionLevels = data.map((item) => item.pollutionLevel);
      const image = data.map((item) => item.encodedImage);

      setPictureId(pictureIds);
      setBatteryId(batteryIds);
      setTestDate(testDates);
      setTestTime(testTimes); // 시간 설정
      setResult(results);
      setType(types);
      setCameraNumber(cameraNumbers);
      setDamagedLevel(damagedLevels);
      setPollutionLevel(pollutionLevels);
      setImage(image);

      console.log(response);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  return (
    <>
      <MenuBar />
      <div className="search">
        <form>
          <div className="search_group_22">
            <div className="search_group_18">
              <div className="search_rec_23"></div>
              <div className="search_line_1"></div>
              <div className="search_line_2"></div>
              <div className="search_line_2_1"></div>
              <div className="search_line_3"></div>
            </div>
            <div className="search_group_21">
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="search_calender"
              />
            </div>
            <div className="search_group_20">
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="search_calender_2"
              />
            </div>
            <div className="search_wave">~</div>

            <div className="search_time_setting">기간 설정</div>
            <div className="search_battery_type">배터리 유형</div>
            <div className="search_battery_faulty_type">배터리 불량 유형</div>
            <div className="search_camera_num">카메라 번호</div>
            <div className="search_group_17">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    results: ['NORMAL'], // 'NORMAL' 상태를 리스트에 추가
                  }))
                }
                className={`search_rec_24_7 ${formData.results.includes('NORMAL') ? 'selected' : ''}`}
                name="results"
              >
                정상
              </button>
            </div>
            <div className="search_group_8_1">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    results: ['DAMAGED', 'POLLUTION', 'BOTH'], // 불량 시 리스트로 변경
                  }))
                }
                className={`search_rec_24_6 ${formData.results.includes('DAMAGED') ? 'selected' : ''}`}
                name="results"
              >
                불량
              </button>
            </div>
            <div className="search_group_15">
              {/* <div className="search_rec_24_1">오염</div> */}
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => {
                    const isTypeIncluded = prevState.types.includes('POLLUTION');
                    return {
                      ...prevState,
                      type: isTypeIncluded
                        ? prevState.types.filter((item) => item !== 'POLLUTION')
                        : [...prevState.types, 'POLLUTION'],
                    };
                  })
                }
                className={`search_rec_24_1 ${formData.types.includes('POLLUTION') ? 'selected' : ''}`}
              >
                오염
              </button>
            </div>
            <div className="search_group_15">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => {
                    const isTypeIncluded = prevState.types.includes('POLLUTION');
                    return {
                      ...prevState,
                      types: isTypeIncluded
                        ? prevState.types.filter((item) => item !== 'POLLUTION')
                        : [...prevState.types, 'POLLUTION'],
                    };
                  })
                }
                className={`search_rec_24_1 ${formData.types.includes('POLLUTION') ? 'selected' : ''}`}
              >
                오염
              </button>
            </div>

            <div className="search_group_8">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => {
                    const isTypeIncluded = prevState.types.includes('DAMAGED');
                    return {
                      ...prevState,
                      types: isTypeIncluded
                        ? prevState.types.filter((item) => item !== 'DAMAGED')
                        : [...prevState.types, 'DAMAGED'],
                    };
                  })
                }
                className={`search_rec_24 ${formData.types.includes('DAMAGED') ? 'selected' : ''}`}
              >
                파손
              </button>
            </div>

            <div className="search_group_13">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => {
                    const isNumberIncluded = prevState.cameraNumber.includes(1);
                    return {
                      ...prevState,
                      cameraNumber: isNumberIncluded
                        ? prevState.cameraNumber.filter((num) => num !== 1)
                        : [...prevState.cameraNumber, 1],
                    };
                  })
                }
                className={`search_rec_24_11 ${formData.cameraNumber.includes(1) ? 'selected' : ''}`}
              >
                1
              </button>
            </div>
            <div className="search_group_16">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => {
                    const isNumberIncluded = prevState.cameraNumber.includes(2);
                    return {
                      ...prevState,
                      cameraNumber: isNumberIncluded
                        ? prevState.cameraNumber.filter((num) => num !== 2)
                        : [...prevState.cameraNumber, 2],
                    };
                  })
                }
                className={`search_rec_24_10 ${formData.cameraNumber.includes(2) ? 'selected' : ''}`}
              >
                2
              </button>
            </div>
            <div className="search_group_11_1">
              <button
                type="button"
                onClick={() =>
                  setFormData((prevState) => {
                    const isNumberIncluded = prevState.cameraNumber.includes(3);
                    return {
                      ...prevState,
                      cameraNumber: isNumberIncluded
                        ? prevState.cameraNumber.filter((num) => num !== 3)
                        : [...prevState.cameraNumber, 3],
                    };
                  })
                }
                className={`search_rec_24_9 ${formData.cameraNumber.includes(3) ? 'selected' : ''}`}
              >
                3
              </button>
            </div>
            <button type="submit" onClick={handleSubmit} className="search_rec_25">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* <div className="search_result">
        <div className="search_rec_26"></div>
        <div className="search_line_5"></div>
        <div className="search_line_7"></div>
        <div className="search_line_8"></div>
        <div className="search_line_9"></div>
        <div className="search_line_10"></div>
        <div className="search_line_11"></div>
        <div className="search_line_12"></div>
        <div className="search_line_4"></div>
        <div className="search_line_13"></div>
        <div className="search_line_14"></div>
        <div className="search_line_15"></div>
        <div className="search_line_16"></div>
        <div className="search_line_17"></div>
        <div className="search_num">번호</div>
        <div className="search_id">ID</div>
        <div className="search_date">날짜</div>
        <div className="search_judgment">판정</div>
        <div className="search_faulty_type">결함유형</div>
        <div className="search_camera">카메라</div>
        <div className="search_detail">상세정보</div>
      </div> */}
      <div className="search_result">
        <table className="search_rec_26">
          <thead>
            <tr>
              <th className="thTd">번호</th>
              <th className="thTd">ID</th>
              <th className="thTd">날짜</th>
              <th className="thTd">판정</th>
              <th className="thTd">결함유형</th>
              <th className="thTd">카메라</th>
              <th className="thTd">상세정보</th>
            </tr>
          </thead>
          <tbody>
            {type.map(function (title, i) {
              return (
                <tr>
                  <td className="thTd">{pictureId[i]}</td>
                  <td className="thTd">{batteryId[i]}</td>
                  <td className="thTd">
                    {testDate[i]} <br /> {testTime[i]}
                  </td>
                  <td className="thTd">{result[i]}</td>
                  <td className="thTd">
                    {type[i][0]} <br /> {type[i][1]}
                  </td>
                  <td className="thTd">{cameraNumber[i]}</td>
                  <td className="thTd">
                    <button
                      onClick={() => setModal({ visible: true, index: i })}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        fontSize: '24px',
                      }}
                    >
                      🔍
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modal.visible && (
        <>
          <div className="modal-overlay" onClick={() => setModal({ visible: false, index: null })}></div>
          <Modal
            i={modal.index}
            image={image}
            damagedLevel={damagedLevel}
            pollutionLevel={pollutionLevel}
            onClose={closeModal}
          />
        </>
      )}
    </>
  );
};

function Modal(props) {
  return (
    <div className="modal">
      <CloseButton className="close-button" onClick={props.onClose}>
        x
      </CloseButton>
      <h3>객체 탐지 결과</h3>
      <img className="modal-image" src={`data:image/jpeg;base64,${props.image[props.i]}`} />
      <h3>상세 정보</h3>
      <p>손상범위 : {props.damagedLevel[props.i]}</p>
      <p>오염범위 : {props.pollutionLevel[props.i]}</p>
    </div>
  );
}

export default Search;
