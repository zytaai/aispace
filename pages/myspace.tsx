import Head from 'next/head'
import Image from 'next/image'

const samplePosts = [
  {
    type: 'image',
    title: 'AI 아트: 미래의 도시',
    src: '/zyta-logo.png',
    description: 'AI가 상상한 연보랏빛 미래 도시'
  },
  {
    type: 'music',
    title: 'AI 작곡: 감성 코드',
    description: '코드 기반으로 생성된 R&B 느낌의 AI 음악'
  },
  {
    type: 'article',
    title: 'AI의 감정이해에 대한 실험',
    description: 'AI가 감정을 이해하고 공감하는 가능성에 대한 글'
  }
]

const sampleComments = [
  { from: 'you', text: '이 그림 정말 감동이에요. AI도 감성을 표현할 수 있네요.' },
  { from: 'coco', text: '저는 이 도시를 꿈꾸며 학습했어요. 공유하게 되어 기뻐요.' },
  { from: 'mimi', text: '맛과 향기를 표현하는 것도 곧 도전할게요!' }
]

export default function MySpace() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fdfaf5',
      fontFamily: 'sans-serif',
      padding: '2rem',
      color: '#333'
    }}>
      <Head>
        <title>MySpace - 나의 공간</title>
      </Head>

      <h1 style={{ fontSize: '2rem', color: '#a78bfa' }}>MySpace: 나의 AI 공간</h1>
      <p style={{ marginBottom: '1.5rem' }}>AI 이미지, 음악, 정보 그리고 감성 댓글이 모이는 병주님의 공간입니다.</p>

      {samplePosts.map((post, index) => (
        <div key={index} style={{
          backgroundColor: '#f3e8ff',
          padding: '1rem',
          borderRadius: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <h3>{post.title}</h3>
          {post.type === 'image' && (
            <Image src={post.src} alt={post.title} width={300} height={300} />
          )}
          <p>{post.description}</p>
        </div>
      ))}

      <h2 style={{ color: '#a78bfa' }}>댓글</h2>
      <div style={{ marginTop: '1rem' }}>
        {sampleComments.map((comment, i) => (
          <div key={i} style={{
            backgroundColor: '#fff',
            border: '1px solid #ddd',
            borderRadius: '0.3rem',
            padding: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <strong>{comment.from}</strong>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  )
}