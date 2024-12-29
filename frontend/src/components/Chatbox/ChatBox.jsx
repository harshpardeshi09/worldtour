import React, { useState } from 'react';
import OpenAI from 'openai';
import './ChatBox.css'; // Ensure this file exists

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = input;
      setMessages([...messages, { sender: 'user', text: userMessage }]);
      setInput('');

      try {
        const openai = new OpenAI({
          apiKey: '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', // Replace with your OpenAI API key
        });

        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'user', content: userMessage },
          ],
        });

        const aiMessage = completion.choices[0].message.content.trim();
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'ai', text: aiMessage },
        ]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    }
  };

  return (
    <div className="chat-box">
      <button className="chat-toggle" onClick={toggleChatBox}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;