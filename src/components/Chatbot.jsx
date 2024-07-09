import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messages = useSelector(states => states.chatbot);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (input.trim()) {
      if(input==='') return;
      dispatch({
        type: 'ADD_USER_MESSAGE',
        payload: {
          type: 'user',
          text: input
        }
      })
      axios.get(import.meta.env.VITE_BACKEND_API_ROUTE + 'chatbot/?q=' + input)
        .then(data => {
          dispatch({
            type: 'ADD_BOT_MESSAGE',
            payload: {
              type: 'bot',
              text: data.data.response
            }
          })
        }).catch(error => {
          alert(error.message);
        })
      setInput('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  return (
    <div className={`chatbot position-fixed bottom-0 end-0 m-3 ${isOpen ? 'open' : ''}`}>
      <button className="btn btn-primary round-button learn-more-btn" onClick={toggleChat}>
        {isOpen ? <span class="material-symbols-outlined" style={{ color: 'white' }}>
          expand_circle_down
        </span> : <span class="material-symbols-outlined" style={{ color: 'white' }}>
          robot_2
        </span>}
      </button>
      {isOpen && (
        <motion.div
          className="card chatbot-window overflow-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card-body d-flex flex-column">
            <div className="chatbot-messages flex-grow-1 mb-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`my-1 ${message.type === 'bot' ? 'bot-message' : 'user-message'} my-1`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control my-form2-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="btn btn-primary learn-more-btn" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;