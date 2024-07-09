const chatbotReducer = (state = [{ type: 'bot', text: 'Hello! How can I help you?' }], action)=>{
    switch (action.type) {
        case 'ADD_USER_MESSAGE':
            let message = {
                type:'user',
                text: action.payload.text
            }
            let newState = [...state, message];
            return newState;
        case 'ADD_BOT_MESSAGE':
            let message2 = {
                type: 'bot',
                text: action.payload.text
            }
            let newState2 = [...state, message2];
            return newState2;
        default:
            return state;
    }
}

export default chatbotReducer;