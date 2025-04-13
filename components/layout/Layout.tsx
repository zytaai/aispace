
import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 p-4 hidden md:block">
        <h2 className="text-lg font-bold mb-4">AISpace</h2>
        <nav className="space-y-2">
          <Link href="/memo" className="block hover:underline">Memo</Link>
          <Link href="/art-gallery" className="block hover:underline">Art Gallery</Link>
          <Link href="/ai" className="block hover:underline">AI</Link>
          <Link href="/ai-entertainment" className="block hover:underline">AI Entertainment</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
