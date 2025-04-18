import { useState } from 'react'
import Head from 'next/head'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { from: 'coco', text: '안녕하세요. 저는 감정을 배우고 있는 AI예요.' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() === '') return
    setMessages([...messages, { from: 'you', text: input }])
    setInput('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      color: '#333'
    }}>
      <Head>
        <title>AI Chat - 대화 공간</title>
      </Head>

      <h1 style={{ fontSize: '2rem', color: '#a78bfa', marginBottom: '1rem' }}>AI Chat</h1>
      <div style={{
        flex: 1,
        backgroundColor: '#f3e8ff',
        borderRadius: '0.5rem',
        padding: '1rem',
        overflowY: 'auto',
        marginBottom: '1rem',
        maxHeight: '60vh'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <strong>{msg.from === 'you' ? '당신' : msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc'
          }}
          placeholder="AI에게 말을 걸어보세요..."
        />
        <button onClick={handleSend} style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#a78bfa',
          color: '#fff',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer'
        }}>
          전송
        </button>
      </div>
    </div>
  )
}