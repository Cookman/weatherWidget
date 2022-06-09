import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {createGETRequest} from "../../utils/api.axios";

const SLICE_KEY = 'weather'

export interface CounterState {
    value: number;
    status: 'idle' | 'loading' | 'failed';
}


const initialState: CounterState = {
    value: 0,
    status: 'idle',
};


export const fetchCurrentWeatherAsync = createAsyncThunk(`${SLICE_KEY}/fetch`,
    ({q}: {q:string }) => createGETRequest({params: {q}}))


export const weatherSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWeatherAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentWeatherAsync.fulfilled, (state, action) => {
                state.status = 'idle';

            })
            .addCase(fetchCurrentWeatherAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.weather;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default weatherSlice.reducer;
