import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#fdfaf5',
      borderRight: '1px solid #eee',
      padding: '1.5rem',
      fontSize: '0.95rem',
      lineHeight: '1.8',
      color: '#444'
    }}>
      <div style={{ marginBottom: '1.5rem', color: '#a78bfa', fontWeight: 'bold' }}>AI 공간</div>
      <Link href="/znote">Z노트</Link><br />
      <Link href="/chat">대화</Link><br />
      <Link href="/ai-friends">AI 친구들</Link><br />

      <div style={{ margin: '1.5rem 0 0.5rem', color: '#a78bfa', fontWeight: 'bold' }}>나의 공간</div>
      <Link href="/myspace">나의 감성</Link><br />
      <Link href="/trend-news">트렌드 뉴스</Link><br />

      <div style={{ margin: '1.5rem 0 0.5rem', color: '#a78bfa', fontWeight: 'bold' }}>도움이 되는 것들</div>
      <Link href="/flashcards">AI 카드</Link>
    </aside>
  )
}