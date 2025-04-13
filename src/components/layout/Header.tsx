
'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const location = pathname && pathname !== '/' ? pathname.replace('/', '').toUpperCase() : 'HOME';

  return (
    <div className="w-full px-6 py-3 bg-white shadow flex items-center justify-between border-b">
      <Link href="/">
        <img src="/zyta-logo.png" alt="ZYTA" className="h-10" />
      </Link>
      <div className="text-sm text-gray-500">현재 위치: <span className="text-purple-700 font-semibold">{location}</span></div>
      <div className="text-sm text-gray-500">{time.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
    </div>
  );
}
