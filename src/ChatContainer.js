// src/ChatContainer.js

import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import InputArea from './InputArea';
import './styles.css';

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('Gemini AI'); // Default selected model

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      try {
        const response = await fetch('http://localhost:3000/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input, model: selectedModel }), // Send message and selected model to backend
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const botReply = { text: data.reply, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botReply]); // Update messages with bot's reply
      } catch (error) {
        console.error('Failed to fetch:', error);
        // Optionally handle errors here
      }
    }
  };

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value); // Update selected model when dropdown value changes
  };

  return (
    <div className="chat-container">
      <h1>LLM Aggregator</h1>
      <div className="model-select">
        <label>Select Model:</label>
        <select value={selectedModel} onChange={handleModelChange}>
          <option value="Gemini AI">Gemini AI</option>
          <option value="ChatGPT">ChatGPT</option>
          <option value="Other Model 1">Other Model 1</option>
          <option value="Other Model 2">Other Model 2</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="chat-window">
        <ChatWindow messages={messages} />
      </div>
      <InputArea input={input} setInput={setInput} sendMessage={sendMessage} />
    </div>
  );
};

export default ChatContainer;
