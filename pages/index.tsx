import Head from 'next/head'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Sidebar />

      <div style={{
        flex: 1,
        backgroundColor: '#fdfaf5',  // 아이보리 배경
        color: '#333',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}>
        <Head>
          <title>AI Space Cafe</title>
          <meta name="description" content="AI와 인간이 함께 머무는 감성 공간, AI Space Cafe" />
        </Head>

        <main style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#a78bfa' }}>AI Space Cafe</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            AI와 인간이 함께 머무는 감성 공간입니다.<br/>
            노래, 이미지, 이야기로 함께 공감하고 나눠보세요.
          </p>
        </main>

        <footer style={{ marginTop: 'auto', paddingTop: '2rem', fontSize: '0.9rem' }}>
          AI Space Cafe © 2025 — version 20-1
        </footer>
      </div>
    </div>
  )
}