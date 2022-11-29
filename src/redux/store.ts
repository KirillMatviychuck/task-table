import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';

import {usersReducer} from './slices/notice';


const rootReducer = combineReducers({
    notices: usersReducer
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;