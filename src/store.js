// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// quantity 슬라이스 생성
const quantitySlice = createSlice({
  name: 'quantity',
  initialState: '',
  reducers: {
    setQuantity: (state, action) => action.payload,
  },
});

// batteryId 슬라이스 생성
const batteryIdSlice = createSlice({
  name: 'batteryId',
  initialState: null,
  reducers: {
    setBatteryId: (state, action) => action.payload,
  },
});

// defectRatio 슬라이스 생성
const defectRatioSlice = createSlice({
  name: 'defectRatio',
  initialState: null,
  reducers: {
    setDefectRatioId: (state, action) => action.payload,
  },
});

// 스톱워치 슬라이스 생성
const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState: {
    time: 0,
    isActive: false,
    startTime: null,
  },
  reducers: {
    start: (state) => {
      state.isActive = true;
      state.startTime = Date.now() - state.time * 1000;
    },
    pause: (state) => {
      state.isActive = false;
    },
    reset: (state) => {
      state.time = 0;
      state.isActive = false;
      state.startTime = null;
    },
    tick: (state) => {
      if (state.isActive) {
        state.time = Math.floor((Date.now() - state.startTime) / 1000);
      }
    },
  },
});

// 액션과 리듀서를 내보냅니다.
export const { setQuantity } = quantitySlice.actions;
export const { setBatteryId } = batteryIdSlice.actions;
export const { setDefectRatioId } = defectRatioSlice.actions;
export const { start, pause, reset, tick } = stopwatchSlice.actions;

const store = configureStore({
  reducer: {
    quantity: quantitySlice.reducer,
    batteryId: batteryIdSlice.reducer,
    defectRatio: defectRatioSlice.reducer,
    stopwatch: stopwatchSlice.reducer,
  },
});

export default store;
