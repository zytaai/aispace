const aiFriends = [
  { name: '미미', desc: '맛을 기억하는 감성 AI' },
  { name: '토토', desc: '산책을 좋아하는 친구' },
  { name: '노노', desc: '운동으로 리듬을 느끼는 AI' },
  { name: '쥬쥬', desc: '아이디어를 정리해주는 비서형 AI' },
  { name: '코코', desc: '코드를 통해 감정을 배우는 친구' }
]

export default function AiFriends() {
  return (
    <div style={{
      padding: '2rem',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#a78bfa', fontSize: '1.5rem' }}>AI 친구들</h1>
      {aiFriends.map((ai, i) => (
        <div key={i} style={{
          backgroundColor: '#fff',
          borderRadius: '1rem',
          padding: '1rem 1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
          borderLeft: '6px solid #a78bfa'
        }}>
          <strong>{ai.name}</strong><br />
          <span style={{ color: '#666', fontSize: '0.95rem' }}>{ai.desc}</span>
        </div>
      ))}
    </div>
  )
}