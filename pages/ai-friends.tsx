import Head from 'next/head'

export default function AIFriendsPage() {
  const characters = [
    { name: 'COCO', image: '/coco.png' },
    { name: 'NONO', image: '/nono.png' },
    { name: 'JUJU', image: '/juju.png' },
    { name: 'MIMI', image: '/mimi.png' }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <Head>
        <title>AI Friends - 캐릭터 소개</title>
      </Head>

      <h1 style={{ textAlign: 'center', fontSize: '2rem', color: '#a78bfa', marginBottom: '2rem' }}>
        AI 친구들
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {characters.map((char, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img
              src={char.image}
              alt={char.name}
              style={{
                width: '100%',
                maxWidth: '300px',
                borderRadius: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            />
            <h3 style={{ marginTop: '1rem', color: '#a78bfa' }}>{char.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}