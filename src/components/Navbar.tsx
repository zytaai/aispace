import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#fdfaf5',
      padding: '1rem 2rem',
      borderBottom: '1px solid #eee',
      display: 'flex',
      gap: '1.5rem',
      fontSize: '1rem',
      color: '#a78bfa'
    }}>
      <Link href="/">홈</Link>
      <Link href="/znote">Znote</Link>
      <Link href="/myspace">MySpace</Link>
      <Link href="/chat">Chat</Link>
      <Link href="/trend-news">AI 트렌드 뉴스</Link>
      <Link href="/ai-friends">AI 친구들</Link>
    </nav>
  )
}