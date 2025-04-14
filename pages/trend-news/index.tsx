import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function IndexPage() {
  const [posts, setPosts] = useState<{
    id: number, title: string, content: string, image?: string
  }[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('trend-newsPosts')
    if (saved) {
      setPosts(JSON.parse(saved))
    }
  }, [])

  const handleDelete = (id: number) => {
    const updated = posts.filter(p => p.id !== id)
    setPosts(updated)
    localStorage.setItem('trend-newsPosts', JSON.stringify(updated))
  }

  return (
    <div style={ backgroundColor: '#fdfaf5', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }>
      <h1 style={ fontSize: '1.5rem', color: '#a78bfa' }>TREND NEWS 게시판</h1>

      <div style={ marginBottom: '1rem' }>
        <Link href="/trend-news/write" style={
          backgroundColor: '#a78bfa', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none'
        }>글쓰기</Link>
      </div>

      {posts.length === 0 && <p style={ color: '#888' }>아직 등록된 글이 없습니다.</p>}

      <div style={ display: 'flex', flexDirection: 'column', gap: '1rem' }>
        {posts.map(post => (
          <div key={post.id} style={
            backgroundColor: '#fff',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            position: 'relative'
          }>
            <strong>{post.title}</strong>
            <p style={ color: '#555', margin: '0.5rem 0' }>{post.content}</p>
            {post.image && (
              <img src={post.image} alt="preview" style={ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '0.5rem' } />
            )}
            <button onClick={() => handleDelete(post.id)} style={
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer'
            }>삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}