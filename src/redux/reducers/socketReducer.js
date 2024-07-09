import { io } from 'socket.io-client';

const socketReducer = (state = null, action) => {
    switch (action.type) {
        case 'INITIALIZE_SOCKET':
            return io(import.meta.env.VITE_BACKEND_SOCKET_SERVER_URL);
        default:
            return state;
    }
};

export default socketReducer;
