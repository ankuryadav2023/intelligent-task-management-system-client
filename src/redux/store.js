import { createStore,combineReducers } from 'redux';
import socketReducer from './reducers/socketReducer';

const reducers=combineReducers({
    socket:socketReducer,
})

const store=createStore(reducers);

export default store;