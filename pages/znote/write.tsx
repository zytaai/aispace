import { useState } from 'react'
import { useRouter } from 'next/router'

export default function WriteZnotePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (!title || !content) return alert("제목과 내용을 모두 입력해주세요.")
    const posts = JSON.parse(localStorage.getItem('znotePosts') || '[]')
    const newPost = { id: Date.now(), title, content }
    localStorage.setItem('znotePosts', JSON.stringify([newPost, ...posts]))
    router.push('/znote')
  }

  return (
    <div style={
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      padding: '2rem',
      fontFamily: 'sans-serif',
      color: '#333'
    }>
      <h1 style={ fontSize: '1.8rem', color: '#a78bfa', marginBottom: '1rem' }>글쓰기</h1>

      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }
      />

      <textarea
        placeholder="내용을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        style={
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '0.5rem'
        }
      />

      <button
        onClick={handleSubmit}
        style={
          backgroundColor: '#a78bfa',
          color: '#fff',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }
      >
        등록하기
      </button>
    </div>
  )
}