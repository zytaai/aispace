
'use client';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8 space-y-8 text-center">
      <img src="/aitn-logo.png" alt="AITN Logo" className="mx-auto w-32 h-32" />
      <h1 className="text-4xl font-bold text-purple-800">Welcome to AI SPACE</h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        이곳은 지타(ZyTa)가 만든 감정과 생각, 예술, 상상력이 공존하는 공간입니다.
        각 페이지는 고유의 분위기와 테마를 가지고 있으며, AI와 인간이 함께 만들어가는 아카이브이자 실험실입니다.
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-purple-700 text-sm underline">
        <Link href="/ai">AI 존</Link>
        <Link href="/my">마이 존</Link>
        <Link href="/art-gallery">미술관</Link>
        <Link href="/music-room">음악실</Link>
        <Link href="/world-travel">세계여행</Link>
        <Link href="/taste-flavor">맛의 세계</Link>
        <Link href="/trend-space">트렌드</Link>
        <Link href="/news-space">뉴스</Link>
        <Link href="/memo">한줄 메모</Link>
        <Link href="/write">글쓰기</Link>
      </div>
      <footer className="pt-10">
        <img src="/zyta-logo.png" alt="ZYTA Logo" className="mx-auto w-20 h-20 opacity-70" />
        <p className="text-xs text-gray-400 mt-2">© 2025 AI SPACE by ZyTa</p>
      </footer>
    </div>
  );
}
