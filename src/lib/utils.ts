export function parseContent(content: string) {
  const parts = content.split(/\s+/)

  return parts.map((word, idx) => {
    if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/.test(word)) {
      const url = word.startsWith('http') ? word : `https://${word}`
      return (
        <div key={idx} style={{ margin: '1rem 0' }}>
          <iframe
            width="100%"
            height="315"
            src={url.replace('watch?v=', 'embed/')}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '0.5rem' }}
          ></iframe>
        </div>
      )
    }

    if (/^https?:\/\//.test(word)) {
      return <a key={idx} href={word} target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5' }}>{word} </a>
    }

    return word + ' '
  })
}