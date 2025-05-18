import { configureStore } from '@reduxjs/toolkit';
import whatsappReducer from './Components/WhatsApp/whatsappSlice';

export const store = configureStore({
  reducer: {
    whatsapp: whatsappReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Useful if you're storing non-serializable data like Date objects
    }),
});