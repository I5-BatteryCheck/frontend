import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

const MainDefectChart = () => {
  const [normalRatio, setNormalRatio] = useState(null);
  const [defectRatio, setDefectRatio] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오기 함수
  const fetchData = async () => {
    try {
      const response = await axios.get('http://52.79.89.88:8002/api/battery/defectRatio'); // API 경로를 여기에 적어주세요
      const result = response.data;

      if (result.success) {
        setNormalRatio(result.data.normalRatio);
        setDefectRatio(result.data.defectRatio);
      } else {
        throw new Error('API 호출이 실패했습니다.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 5초마다 데이터 갱신
  useEffect(() => {
    fetchData(); // 처음 로드 시 데이터 가져오기

    const intervalId = setInterval(() => {
      fetchData(); // 2초마다 데이터 갱신
    }, 2000);

    // 컴포넌트 언마운트 시 interval 정리
    return () => clearInterval(intervalId);
  }, []);

  // 로딩 상태와 에러 처리
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false, // 도구 모음 숨기기
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%';
        },
      },
    },
    fill: {
      opacity: 1,
    },
    // legend: {
    //   position: 'top',
    //   horizontalAlign: 'left',
    //   offsetX: 40,
    // },
    colors: ['#0000FF', '#FF0000'],
    xaxis: {
      categories: ['Category 1'],
      labels: {
        show: false, // x축 레이블 숨기기
      },
      axisBorder: {
        show: false, // x축 테두리 숨기기
      },
      axisTicks: {
        show: false, // x축 눈금 숨기기
      },
    },
    yaxis: {
      labels: {
        show: false, // y축 레이블 숨기기
      },
      axisBorder: {
        show: false, // y축 테두리 숨기기
      },
      axisTicks: {
        show: false, // y축 눈금 숨기기
      },
    },
    legend: {
      show: false, // 범례 숨기기
    },
    plugins: {
      tooltip: {
        enabled: false, // tooltip 비활성화
      },
      datalabels: {
        display: false, // 데이터 레이블 비활성화
      },
    },
  };

  const series = [
    {
      name: '정상',
      data: [normalRatio],
    },
    {
      name: '불량',
      data: [defectRatio],
    },
  ];

  return (
    <div className="produc_rectangle_18">
      <Chart options={options} series={series} type="bar" width={400} height={80} />
    </div>
  );
};

export default MainDefectChart;
