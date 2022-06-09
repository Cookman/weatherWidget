import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import weather from './weather/weather.slice';

export const store = configureStore({
  reducer: {
    weather,
  },
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false, // set to false because redux-form fails
    });
    return defaultMiddleware
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
