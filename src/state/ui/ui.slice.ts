import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../state/store';
import {UIState} from "./ui.types";


const SLICE_KEY = 'ui'

const initialState: UIState = {
    modalVisible: false
};

//ACTIONS


//SLICE
export const uiSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        showModal(state) {
            state.modalVisible = true
        },
        hideModal(state) {
            state.modalVisible = false
        },
    },

});

//SELECTORS
export const modalVisibleSelector = (state: RootState) => state.ui.modalVisible;

export const {showModal, hideModal} = uiSlice.actions

export default uiSlice.reducer;
