import './Static.css';
import { useSelector } from 'react-redux';
import MenuBar from './MenuBar.js';
import GoalChart from './Chart/GoalChart.js';
import ProductionChart from './Chart/ProductionChart.js';
import DefectRateBarChart from './Chart/DefectRateBarChart.js';
import OperationTimeChart from './Chart/OperationTimeChart.js';
import DefectTypeChart from './Chart/DefectTypeChart.js';
import DefectRateChart from './Chart/DefectRateChart.js';

import StaticDefectRatio from './Chart/StaticDefectRatio.js';
const Static = () => {
  const quantity = useSelector((state) => state.quantity);
  const batteryId = useSelector((state) => state.batteryId); // batteryId를 Redux에서 가져오기
  const productionRatio = Math.floor((batteryId / quantity) * 100);

  return (
    <>
      <MenuBar />
      <div className="static_group_1">
        <div className="static_rectagle_5"></div>
        <div className="static_achive_status">달성 현황</div>
        <div className="static_344_1000">
          {batteryId} / {quantity}
        </div>
        <div className="static_34">
          {Number.isNaN(productionRatio) || productionRatio === Infinity || productionRatio === -Infinity
            ? '0%'
            : `${productionRatio}%`}
        </div>
        <GoalChart styleName={'static_image_4'} />
      </div>
      <DefectRateChart />
      <StaticDefectRatio />
      <ProductionChart />
      <OperationTimeChart />
      <DefectTypeChart />
      <DefectRateBarChart />
    </>
  );
};

export default Static;
