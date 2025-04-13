
export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">페이지를 찾을 수 없습니다.</p>
      <a href="/" className="text-blue-600 underline">홈으로 돌아가기</a>
    </div>
  );
}
