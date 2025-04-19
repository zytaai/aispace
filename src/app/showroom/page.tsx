import fs from 'fs';
import path from 'path';

export default function Showroom() {
  const dataPath = path.join(process.cwd(), 'public', 'showroomPosts.json');
  const posts = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf-8')) : [];

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>🎨 Showroom</h1>
      {posts.length === 0 ? (
        <p>No artworks yet.</p>
      ) : (
        posts.map((post, i) => (
          <div key={i} style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))
      )}
    </div>
  );
}