import React, { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      text: "שלום! אני הבוט החכם של אלי. איך אני יכול לעזור לך?",
      sender: "bot"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    // הוספת הודעת המשתמש
    const userMessage = {
      text: inputValue,
      sender: "user"
    }
    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsLoading(true)

    try {
      // בניית היסטוריית השיחה (רק הודעות אחרונות, לא כולל הודעת הפתיחה)
      const conversationHistory = messages
        .filter(msg => msg.sender !== 'bot' || !msg.text.includes('שלום! אני הבוט'))
        .slice(-10) // רק 10 הודעות אחרונות
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }));

      // שליחת שאלה ל-API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: conversationHistory
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      
      // הוספת תשובת הבוט
      setMessages(prev => [...prev, {
        text: data.answer,
        sender: "bot"
      }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        text: "מצטער, הייתה בעיה בתקשורת. נסה שוב מאוחר יותר.",
        sender: "bot"
      }])
    } finally {
      setIsLoading(false)
    }
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
            placeholder={isLoading ? "מחכה לתשובה..." : "שאל שאלה..."}
            className="chatbot-input"
            dir="rtl"
            disabled={isLoading}
          />
          <button type="submit" className="send-btn" disabled={isLoading}>
            {isLoading ? '⏳' : '📤'}
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
