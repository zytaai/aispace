import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const routeToLabel: Record<string, string> = {
  '/': '홈',
  '/myspace': '나의 공간',
  '/znote': 'Z노트',
  '/chat': '대화',
  '/trend-news': '트렌드 뉴스',
  '/ai-friends': 'AI 친구들',
  '/flashcards': 'AI 카드'
}

export default function Header() {
  const router = useRouter()
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const interval = setInterval(update, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      padding: '1rem 2rem',
      backgroundColor: '#fdfaf5',
      borderBottom: '1px solid #eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#a78bfa',
      fontSize: '1rem'
    }}>
      <div>지금 이 공간: {routeToLabel[router.pathname] || '어딘가'}</div>
      <div style={{ fontSize: '0.95rem', color: '#aaa' }}>{time}</div>
    </div>
  )
}