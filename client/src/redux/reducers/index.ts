import { combineReducers } from 'redux';
import streamReducer from './stream.reducer';

const rootReducer = combineReducers({
    stream: streamReducer
});

export default rootReducer;