import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {createGETRequest} from "../../utils/api.axios";
import {WeatherResponse, WeatherState} from "./weather.types";

const SLICE_KEY = 'weather'

const initialState: WeatherState = {
    value: {},
    isLoading: {},
    error: {}
};

//ACTIONS
export const fetchCurrentWeatherAsync = createAsyncThunk(
    `${SLICE_KEY}/fetch`,
    ({q}: { q: string }) => createGETRequest<WeatherResponse>({params: {q}}),
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
            .addCase(fetchCurrentWeatherAsync.pending, (state,action) => {
                if(!state.value[action.meta.arg.q]) {
                    state.isLoading[action.meta.arg.q] = true;
                }
            })
            .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
                state.isLoading[action.meta.arg.q] = false;
                state.value[action.meta.arg.q] = action.payload.data
            })
            .addCase(fetchCurrentWeatherAsync.rejected, (state, action) => {
                state.isLoading[action.meta.arg.q] = true;

                // @ts-ignore
                state.error = action.error.status
            });
    },
});

//SELECTORS
export const isLoadingSelector = (state: RootState,q: string) => state.weather.isLoading[q];
export const weatherDataSelector = (state: RootState, q: string) => state.weather.value[q]
export const weatherErrorSelector = (state: RootState,q: string) => state.weather.error[q]


export default weatherSlice.reducer;
