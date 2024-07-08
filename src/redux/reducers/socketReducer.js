import { io } from 'socket.io-client';

const socketReducer = (state = null, action) => {
    switch (action.type) {
        case 'INITIALIZE_SOCKET':
            return io('https://zaptask-server.onrender.com');
        default:
            return state;
    }
};

export default socketReducer;
