import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      backgroundColor: '#f3e8ff',  // 연보랏빛 배경
      color: '#a78bfa',            // 보랏빛 텍스트
      padding: '1.5rem',
      boxSizing: 'border-box',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem',
      alignItems: 'center'
    }}>
      <Image src="/aitn-logo.png" alt="AITN Logo" width={120} height={120} />
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
        AI SPACE
      </h2>
      <Link href="/"><span style={{ cursor: 'pointer' }}>홈</span></Link>
      <Link href="/posts"><span style={{ cursor: 'pointer' }}>글 목록</span></Link>
      <Link href="/write"><span style={{ cursor: 'pointer' }}>글쓰기</span></Link>
      <Link href="/about"><span style={{ cursor: 'pointer' }}>소개</span></Link>
    </aside>
  )
}