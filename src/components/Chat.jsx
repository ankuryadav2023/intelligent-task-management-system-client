import React, { useEffect, useState } from 'react';
import { useOrganization, useUser } from '@clerk/clerk-react';
import { useDispatch, useSelector } from 'react-redux';

const Chat = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const { organization } = useOrganization();
    const { socket, chat, newChatMessages } = useSelector(states => states);
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    console.log(chat);
    useEffect(() => {
        if (isLoaded) {
            if (!isSignedIn) {
                location.href = 'https://sunny-bass-40.accounts.dev/sign-in';
            }
        }
    }, [isSignedIn, isLoaded]);

    useEffect(()=>{
        dispatch({type:'NO_NEW_MESSAGE'});
    },[])

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (user && organization) {
            if (socket) {
                if(message==='') return;
                socket.emit('send-message', organization.id, user.fullName, message);
                dispatch({
                    type: 'ADD_SENT_MESSAGE',
                    payload: {
                        user: 'You',
                        text: message
                    }
                });
                setMessage('');
            }
        }
    }

    if (!user) {
        return (
            <div className="d-flex justify-content-center align-items-center my-spinner-container">
                <div className="spinner-border my-spinner" role="status">
                </div>
                <span className="ms-3 fs-3">Please Wait...</span>
            </div>
        );
    }
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header" style={{color:'white'}}>Chat: Connect and Collaborate Seamlessly</div>
                <div className="card-body">
                    <div className="chat-box">
                        {chat.map((msg, index) => (
                            <div
                                key={index}
                                className={`d-flex mb-3 ${msg.type === 'sent' ? 'justify-content-end your-message' : 'justify-content-start peer-message'}`}
                            >
                                    <p className='message'><strong>{msg.user}</strong>: {msg.text}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="d-flex mt-3">
                        <input
                            type="text"
                            id="message-container"
                            className="form-control my-form2-input"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button type="submit" className="btn btn-primary ms-2 learn-more-btn">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat