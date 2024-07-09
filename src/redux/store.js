import { createStore,combineReducers } from 'redux';
import socketReducer from './reducers/socketReducer';
import {chatReducer, newChatMessagesReducer} from './reducers/chatReducers';
import chatbotReducer from './reducers/chatbotReducer';

const reducers=combineReducers({
    socket:socketReducer,
    chat:chatReducer,
    newChatMessages:newChatMessagesReducer,
    chatbot:chatbotReducer
})

const store=createStore(reducers);

export default store;