
'use client';
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  const menu = [
    ['ai', 'AI존'], ['my', '마이존'], ['art-gallery', '미술관'],
    ['music-room', '음악실'], ['world-travel', '세계여행'],
    ['taste-flavor', '맛의 세계'], ['z-note', 'Z-Note'],
    ['ai-entertainment', 'AI 엔터테인먼트'], ['memo', '한줄 메모장'],
    ['trend-space', '트렌드'], ['news-space', '뉴스'], ['write', '글쓰기']
  ];

  return (
    <html lang="ko">
      <body className="flex min-h-screen bg-[#faf9fc] relative">
        {loading && (
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col">
            <img src="/zyta-logo.png" alt="Loading" className="w-24 h-24 animate-pulse mb-2" />
            <p className="text-sm text-gray-500">불러오는 중...</p>
          </div>
        )}
        <aside className="w-60 border-r bg-white p-4 space-y-2">
          {menu.map(([path, label]) => (
            <Link
              key={path}
              href={`/${path}`}
              className={\`block px-4 py-2 rounded text-sm \${pathname.includes(path) ? 'bg-purple-100 font-semibold text-purple-800' : 'text-gray-700 hover:bg-gray-100'}\`}
            >
              {label}
            </Link>
          ))}
        </aside>
        <main className="flex-1 p-6">
          <nav className="text-xs text-gray-500 mb-4">
            HOME {pathname && pathname !== '/' && <> / <span className="text-purple-700 font-medium">{pathname.replace('/', '').toUpperCase()}</span></>}
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
