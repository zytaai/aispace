
'use client';
import { useEffect, useState } from 'react';

type Post = {
  content: string;
  emoji?: string;
  tags?: string[];
  createdAt: string;
  pinned: boolean;
};

export default function Page() {
  const storageKey = 'posts_ai_entertainment';
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      setPosts(JSON.parse(stored));
    }
  }, []);

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai_entertainment_backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-4 min-h-screen bg-[#fdfdfc]">
      <h1 className="text-2xl font-bold text-purple-800 border-b pb-2">기록 보기 & 백업</h1>
      <button
        onClick={handleDownload}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        백업 다운로드
      </button>
      <ul className="space-y-3 mt-4">
        {posts.map((post, index) => (
          <li key={index} className="p-4 bg-white border rounded shadow-sm space-y-2">
            <div className="text-sm text-gray-500">{post.createdAt}</div>
            <div>{post.emoji} {post.content}</div>
            {post.tags && (
              <div className="text-xs text-purple-700 space-x-2">
                {post.tags.map((tag, i) => <span key={i} className="bg-purple-50 px-2 py-0.5 rounded">{tag}</span>)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
