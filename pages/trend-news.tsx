import Head from 'next/head'
import Link from 'next/link'

const posts = [
  { id: 1, title: 'ChatGPT가 바꾼 일상', summary: '생산성과 창의성의 경계를 허문 도구' },
  { id: 2, title: 'AI로 만든 노래, 저작권은 누구에게?', summary: 'AI 작곡 시대의 법적 쟁점들' },
  { id: 3, title: 'AI로 보는 2030년 미래 직업 지도', summary: '변화하는 직업과 필요한 역량은?' }
]

export default function TrendNews() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      padding: '2rem',
      color: '#333'
    }}>
      <Head>
        <title>AI 트렌드 뉴스</title>
      </Head>

      <h1 style={{ fontSize: '2rem', color: '#a78bfa', marginBottom: '1.5rem' }}>
        AI 트렌드 뉴스
      </h1>
      <p style={{ marginBottom: '2rem' }}>누구나 참여할 수 있는 AI 이야기 공유 게시판입니다.</p>

      {posts.map(post => (
        <div key={post.id} style={{
          backgroundColor: '#f3e8ff',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginBottom: '1rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h2>
          <p style={{ margin: 0 }}>{post.summary}</p>
        </div>
      ))}
    </div>
  )
}