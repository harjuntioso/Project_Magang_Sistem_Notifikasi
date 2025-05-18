import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'disconnected',
  qrCode: null,
  messages: [],
  error: null,
};

export const whatsappSlice = createSlice({
  name: 'whatsapp',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setQRCode: (state, action) => {
      state.qrCode = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setStatus, setQRCode, addMessage, setError, clearError } = whatsappSlice.actions;
export default whatsappSlice.reducer;