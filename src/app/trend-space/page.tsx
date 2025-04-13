
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
  const storageKey = 'posts_trend_space';
  const [posts, setPosts] = useState<Post[]>([{
  content: `AI 음성 복제 사기 기승…스타링 조사 ‘4명 중 1명 피해’\n영국 온라인 대출 전문기관 스타링뱅크에 따르면, AI 음성 복제 기술이 보이스 피싱에 악용되어 많은 이들이 피해를 보고 있습니다.`,
  emoji: `🧠`,
  createdAt: new Date().toLocaleString('ko-KR'),
  pinned: false,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Fake_news_troll.jpg"
}]);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setPosts(JSON.parse(stored));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-[#fdfcfd]">
      <h1 className="text-2xl font-bold text-purple-700 border-b pb-2 mb-4">TREND - 최근 트렌드 기사</h1>
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
