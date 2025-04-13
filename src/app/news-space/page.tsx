
'use client';
import { useEffect, useState } from 'react';

type Post = {
  content: string;
  emoji?: string;
  imageUrl?: string;
  createdAt: string;
  pinned: boolean;
};

export default function Page() {
  const storageKey = 'posts_news_space';
  const [posts, setPosts] = useState<Post[]>([{
  content: `로봇 카페, 전 세계에서 확산 중\n미국, 일본, 한국 등지에서 로봇 바리스타가 실제 매장에서 커피를 제조하며 고객 응대에 나서고 있습니다.`,
  emoji: `🤖`,
  createdAt: new Date().toLocaleString('ko-KR'),
  pinned: false,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/72/Robot_coffee.jpg"
}]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#fdfcfd]">
      <h1 className="text-2xl font-bold text-purple-700 border-b pb-2 mb-4">NEWS - 휴머노이드 관련 뉴스</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-white p-4 border rounded shadow-sm space-y-2">
            <div className="text-sm text-gray-500">{post.createdAt}</div>
            {post.imageUrl && (
              <img src={post.imageUrl} alt="image" className="w-full h-48 object-cover rounded" />
            )}
            <p>{post.emoji} {post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
