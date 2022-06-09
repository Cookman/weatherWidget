import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {createGETRequest} from "../../utils/api.axios";
import {WeatherState} from "./weather.types";

const SLICE_KEY = 'weather'

const initialState: WeatherState = {
    value: 0,
    isLoading: false,
    error: ''
};

//ACTIONS
export const fetchCurrentWeatherAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({q}: { q: string }) => createGETRequest({params: {q}}),
    {
        serializeError: (error: any) => ({
            ...error.response,
        })
    }
)

//SLICE
export const weatherSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeatherAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.value = action.payload.data
            })
            .addCase(fetchCurrentWeatherAsync.rejected, (state, action) => {
                state.isLoading = false;

                // @ts-ignore
                state.error=action.error.status
            });
    },
});

//SELECTORS
export const isLoadingSelector = (state: RootState) => state.weather.isLoading;
export const weatherDataSelector = (state: RootState) => state.weather.value
export const weatherErrorSelector = (state: RootState) => state.weather.error


export default weatherSlice.reducer;
