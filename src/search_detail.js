import { useState, useEffect } from 'react';
import './Search.css';

import BrushBarChart from './Chart/BrushBarChart';
const Search_detail = () => {
  const [pictureId, setPictureId] = useState([1, 2, 3, 4, 5]);
  const [batteryId, setBatteryId] = useState([1, 2, 3, 4, 5]);
  const [testDate, setTestDate] = useState([10, 20, 30, 40, 50]);
  const [cameraNumber, setCameraNumber] = useState([1, 2, 3, 4, 5]);
  const [damagedLevel, setDamagedLevel] = useState([1, 2, 3, 4, 5]);
  const [picture, setPicture] = useState([6, 7, 8, 9, 10]);

  const [modal, setModal] = useState({ visible: false, index: null });

  const closeModal = () => {
    setModal({ visible: false, index: null });
  };

  return (
    <>
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
            {pictureId.map((title, i) => (
              <tr key={i}>
                <td className="thTd">{pictureId[i]}</td>
                <td className="thTd">{batteryId[i]}</td>
                <td className="thTd">{testDate[i]}</td>
                <td className="thTd">{cameraNumber[i]}</td>
                <td className="thTd">
                  <button onClick={() => setModal({ visible: true, index: i })}>🔍</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal.visible && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <Modal i={modal.index} picture={picture} damagedLevel={damagedLevel} onClose={closeModal} />
        </>
      )}
      <BrushBarChart />
    </>
  );
};

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.picture[props.i]}</h4>
      <p>{props.damagedLevel[props.i]}</p>
      <button onClick={props.onClose}>x</button> {/* 닫기 버튼 */}
    </div>
  );
}
export default Search_detail;
