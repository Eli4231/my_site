import React, { useState, useRef, useEffect } from 'react'
import { findAnswer } from './chatData'
import './ChatBot.css'

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: "שלום! אני הבוט של אלי. איך אני יכול לעזור לך?",
      sender: "bot"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // הוספת הודעת המשתמש
    const userMessage = {
      text: inputValue,
      sender: "user"
    }
    setMessages(prev => [...prev, userMessage])

    // חיפוש תשובה
    const answer = findAnswer(inputValue)
    
    // הוספת תשובת הבוט (עם עיכוב קצר לאפקט)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: answer,
        sender: "bot"
      }])
    }, 500)

    setInputValue("")
  }

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>💬 שאל אותי על אלי</h3>
          <button 
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form className="chatbot-input-form" onSubmit={handleSend}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="שאל שאלה..."
            className="chatbot-input"
            dir="rtl"
          />
          <button type="submit" className="send-btn">
            📤
          </button>
        </form>
      </div>
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  )
}

export default ChatBot
