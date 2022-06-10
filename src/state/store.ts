import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import weather from './weather/weather.slice';
import ui from './ui/ui.slice'

export const store = configureStore({
  reducer: {
    weather,
    ui
  },
  middleware: getDefaultMiddleware => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
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
