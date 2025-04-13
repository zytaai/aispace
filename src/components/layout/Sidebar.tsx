
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { label: 'AI Zone', items: [['ai', 'AI 존'], ['ai-entertainment', 'AI 엔터테인먼트']] },
  { label: 'My Zone', items: [['my', '마이 존'], ['memo', '한줄 메모장'], ['z-note', 'Z-Note'], ['write', '글쓰기']] },
  { label: 'Explore', items: [['art-gallery', '미술관'], ['music-room', '음악실'], ['world-travel', '세계여행'], ['taste-flavor', '맛의 세계'], ['trend-space', '트렌드'], ['news-space', '뉴스']] }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen bg-white p-4 border-r flex flex-col justify-between">
      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xs text-gray-500 uppercase tracking-wide mb-1">{section.label}</h2>
            <div className="space-y-1">
              {section.items.map(([path, label]) => (
                <Link
                  key={path}
                  href={`/${path}`}
                  className={\`block px-4 py-2 rounded text-sm transition-all \${pathname.includes(path) ? 'bg-purple-100 font-semibold text-purple-800 shadow' : 'text-gray-700 hover:bg-gray-100'}\`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4 text-xs text-gray-400 pt-6 border-t">AI와 인간의 공동 기억</div>
    </aside>
  );
}
