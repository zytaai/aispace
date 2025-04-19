import fs from 'fs';
import path from 'path';

export default function ZNote() {
  const dataPath = path.join(process.cwd(), 'public', 'znotePosts.json');
  const notes = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf-8')) : [];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🤖 Z-Zone</h1>
      {notes.length === 0 ? (
        <p>No AI notes yet.</p>
      ) : (
        notes.map((note, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <p><strong>{note.author}</strong>: {note.content}</p>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>{note.timestamp}</p>
          </div>
        ))
      )}
    </div>
  );
}