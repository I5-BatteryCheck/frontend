import { useState, EventHandler, ReactNode } from 'react';
import MenuBar from './MenuBar.js';
import './Search.css';
const Search = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <MenuBar />
      <div className="search">
        <div className="search_group_19">
          <button className={`search_rec_25 ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
            검색
          </button>
        </div>
        <div className="search_group_22">
          <div className="search_group_18">
            <div className="search_rec_23"></div>
            <div className="search_line_1"></div>
            <div className="search_line_2"></div>
          </div>
          <div className="search_group_8">
            <div className="search_damaged">파손</div>
            <div className="search_rec_24"></div>
          </div>
          <div className="search_group_15">
            <div className="search_pollution">오염</div>
            <div className="search_rec_24_1"></div>
          </div>
          <div className="search_rec_10">
            <div className="search_this_month">금월</div>
            <div className="search_rec_24_2"></div>
          </div>
          <div className="search_group_21">
            <div className="search_calender">📅</div>
            <div className="search_rec_24_3"></div>
          </div>
          <div className="search_group_20">
            <div className="search_calender_2">📅</div>
            <div className="search_rec_24_4"></div>
          </div>
          <div className="search_line_3"></div>
          <div className="search_time_setting">기간 설정</div>
          <div className="search_battery_type">배터리 유형</div>
          <div className="search_camera_num">카메라 번호</div>
          <div className="search_group_8_3">
            <button className={`search_rec_24_5 ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
              최신
            </button>
          </div>
          <div className="search_group_8_1">
            <button className="search_faulty">불량</button>
            <div className="search_rec_24_6"></div>
          </div>
          <div className="search_group_17">
            <div className="search_normal">정상</div>
            <div className="search_rec_24_7"></div>
          </div>
          <div className="search_group_11">
            <div className="search_all">전체</div>
            <div className="search_rec_24_8"></div>
          </div>
          <div className="search_group_11_1">
            <div className="search_3">3</div>
            <div className="search_rec_24_9"></div>
          </div>
          <div className="search_group_16">
            <div className="search_2_1">2</div>
            <div className="search_rec_24_10"></div>
          </div>
          <div className="search_group_13">
            <div className="search_1">1</div>
            <div className="search_rec_24_11"></div>
          </div>
          <div className="search_group_9">
            <button className={`search_rec_24_12 ${clicked ? 'clicked' : ''}`} onClick={handleClick}>
              금주
            </button>
            {/* <div className="search_abstinence">금주</div>
            <div className="search_rec_24_12"></div> */}
          </div>
          <div className="search_wave">~</div>
        </div>
      </div>
      <div className="search_result">
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
      </div>
    </>
  );
};

export default Search;
