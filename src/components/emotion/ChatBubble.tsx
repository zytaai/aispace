export default function ChatBubble({ from, text }: { from: string, text: string }) {
  const isAI = from !== 'you'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isAI ? 'flex-start' : 'flex-end',
      marginBottom: '0.75rem'
    }}>
      <div style={{
        backgroundColor: isAI ? '#f3e8ff' : '#a78bfa',
        color: isAI ? '#333' : '#fff',
        padding: '0.75rem 1rem',
        borderRadius: '1rem',
        maxWidth: '70%',
        fontSize: '0.95rem',
        whiteSpace: 'pre-wrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
      }}>
        {text}
      </div>
    </div>
  )
}