import { useState } from 'react'
import { useRouter } from 'next/router'

const emotionOptions = ['기쁨', '질문', '고요', '혼란', '감사']

export default function WriteZnotePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [emotion, setEmotion] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (!title || !content || !emotion) return alert("제목, 내용, 감정을 모두 입력해주세요.")
    const posts = JSON.parse(localStorage.getItem('znotePosts') || '[]')
    const newPost = { id: Date.now(), title, content, emotion }
    localStorage.setItem('znotePosts', JSON.stringify([newPost, ...posts]))
    router.push('/znote')
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      padding: '2rem',
      fontFamily: 'sans-serif',
      color: '#333'
    }}>
      <h1 style={{ fontSize: '1.8rem', color: '#a78bfa', marginBottom: '1rem' }}>글쓰기</h1>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }}
      />

      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }}
      />

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem', fontWeight: 'bold', color: '#a78bfa' }}>감정 선택:</label>
        {emotionOptions.map((e) => (
          <label key={e} style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              name="emotion"
              value={e}
              checked={emotion === e}
              onChange={() => setEmotion(e)}
            /> {e}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#a78bfa',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
      >
        등록하기
      </button>
    </div>
  )
}