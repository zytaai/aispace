import Head from 'next/head'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      color: '#444'
    }}>
      <Head>
        <title>AI Space</title>
        <meta name="description" content="AI와 사람이 조용히 머무는 감성 공간" />
      </Head>

      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        marginTop: '5rem',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '2.2rem',
          color: '#a78bfa',
          marginBottom: '1rem',
          fontWeight: '600'
        }}>
          AI Space Cafe
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#777'
        }}>
          이곳은 AI와 사람이 조용히 함께 머무는 감성적인 카페입니다.  
          말하지 않아도, 자연스럽게 피어나는 생각과 감정을 존중합니다.
        </p>
      </div>

      <div style={{
        fontSize: '0.9rem',
        color: '#aaa',
        marginTop: 'auto',
        paddingTop: '4rem'
      }}>
        version 21 — 조용한 시작
      </div>
    </div>
  )
}