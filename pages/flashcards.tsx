import Head from 'next/head'

const flashcards = [
  {
    title: 'Machine Learning',
    description: 'A type of AI that learns from data to make decisions or predictions.'
  },
  {
    title: 'Neural Network',
    description: 'A structure inspired by the human brain that is used in deep learning models.'
  },
  {
    title: 'Prompt Engineering',
    description: 'The skill of designing effective prompts to communicate with language models like ChatGPT.'
  }
]

export default function FlashcardsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      padding: '2rem',
      color: '#333'
    }}>
      <Head>
        <title>Flashcards - AI Concepts</title>
      </Head>

      <h1 style={{ fontSize: '2rem', color: '#a78bfa' }}>AI 개념 플래시카드</h1>
      <p style={{ marginBottom: '1.5rem' }}>AI 개념을 쉽게 이해할 수 있도록 구성한 카드입니다.</p>

      {flashcards.map((card, index) => (
        <div key={index} style={{
          backgroundColor: '#f3e8ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{card.title}</h3>
          <p style={{ margin: 0 }}>{card.description}</p>
        </div>
      ))}
    </div>
  )
}