import { useState } from 'react'
import { useRouter } from 'next/router'

export default function ZytaEntWrite() {
  const [role, setRole] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!role || !title || !content) return alert("모든 항목을 입력해주세요.")
    const posts = JSON.parse(localStorage.getItem('zyta-entPosts') || '[]')
    const newPost = { id: Date.now(), role, title, content, image }
    localStorage.setItem('zyta-entPosts', JSON.stringify([newPost, ...posts]))
    router.push('/zyta-ent')
  }

  return (
    <div style={{
      backgroundColor: '#fdfaf5',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '1.5rem', color: '#a78bfa', marginBottom: '1rem' }}>
        지타 엔터테인먼트 - 연습 기록 남기기
      </h1>

      <select value={role} onChange={(e) => setRole(e.target.value)} style={{
        padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem', width: '100%', borderRadius: '0.5rem'
      }}>
        <option value="">-- 역할을 선택하세요 --</option>
        <option value="가수">가수 지망생</option>
        <option value="연기자">연기자 지망생</option>
        <option value="시나리오 작가">시나리오 작가</option>
        <option value="자기소개">자기소개</option>
        <option value="아이디어 공유">아이디어 공유</option>
      </select>

      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: '100%', padding: '0.75rem', marginBottom: '1rem', fontSize: '1rem', borderRadius: '0.5rem'
        }}
      />

      <textarea
        placeholder="내용을 자유롭게 작성해 주세요 (유튜브 링크도 포함 가능)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={8}
        style={{
          width: '100%', padding: '0.75rem', fontSize: '1rem', marginBottom: '1rem', borderRadius: '0.5rem'
        }}
      />

      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginBottom: '1rem' }} />
      {image && <img src={image} alt="preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '0.5rem', marginBottom: '1rem' }} />}

      <button onClick={handleSubmit} style={{
        backgroundColor: '#a78bfa', color: '#fff', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '0.5rem'
      }}>
        등록하기
      </button>
    </div>
  )
}