import { legacy_createStore as createStore, combineReducers } from 'redux';
import { appReducer } from './Reducer/appReducer';
import { tasksReducer } from './Reducer/tasksReducer';

const hearReducer = combineReducers({ appReducer, tasksReducer });
export const store = createStore(hearReducer);
export type AppRootStateType = ReturnType<typeof hearReducer>;

//@ts-ignore

window.store = store;
