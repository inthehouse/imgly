import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './tree/treeSlice';

const store = configureStore({
    reducer: {
        tree: treeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
