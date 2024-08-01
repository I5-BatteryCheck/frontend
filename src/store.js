import { configureStore, createSlice } from '@reduxjs/toolkit';

// quantity 슬라이스 생성
const quantitySlice = createSlice({
  name: 'quantity',
  initialState: '',
  reducers: {
    setQuantity: (state, action) => action.payload,
  },
});

// 액션과 리듀서를 내보냅니다.
export const { setQuantity } = quantitySlice.actions;

export default configureStore({
  reducer: {
    quantity: quantitySlice.reducer,
  },
});
