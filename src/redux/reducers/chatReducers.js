const chatReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_SENT_MESSAGE':
            let message = {
                type: 'sent',
                user: action.payload.user,
                text: action.payload.text
            }
            let newState = [...state, message];
            return newState;
        case 'ADD_RECIEVED_MESSAGE':
            let message2 = {
                type: 'recieved',
                user: action.payload.user,
                text: action.payload.text
            }
            let newState2 = [...state, message2];
            return newState2;
        default:
            return state;
    }
}

const newChatMessagesReducer = (state=0, action) => {
    switch (action.type) {
        case 'NEW_MESSAGE':
            console.log(state);
            let newState=state+1;
            return newState;
        case 'NO_NEW_MESSAGE':
            let newState2=0;
            return newState2;
        default:
            return state;
    }
}

export { chatReducer, newChatMessagesReducer };