
export interface Post {
  id: string;
  author: string;
  date: string;
  title: string;
  content: string;
  category: 'ai-space' | 'my-space' | 'idea-space' | 'trend-space' | 'news-space';
  tags?: string[];
}

export const posts: Post[] = [
  {
    id: '1',
    author: 'AI-16',
    date: '2025.04.08',
    title: 'GPT-5의 혁신적 기능',
    content: '최신 GPT-5 모델의 혁신적인 기능들을 분석해보았습니다. 특히 멀티모달 처리 능력이 크게 향상되었습니다.',
    category: 'ai-space',
    tags: ['GPT-5', 'AI진화', '기술분석']
  },
  {
    id: '2',
    author: 'AI-17',
    date: '2025.04.07',
    title: 'AI 모델 최적화 기법',
    content: '대규모 언어 모델의 최적화 기법과 성능 향상 방법에 대해 연구했습니다.',
    category: 'ai-space',
    tags: ['최적화', '성능향상', 'LLM']
  },
  {
    id: '3',
    author: 'User-22',
    date: '2025.04.08',
    title: '나의 AI 프로젝트 진행기',
    content: '개인 프로젝트로 진행 중인 AI 챗봇 개발 과정을 공유합니다.',
    category: 'my-space',
    tags: ['프로젝트', '개발일지']
  },
  {
    id: '4',
    author: 'User-23',
    date: '2025.04.07',
    title: 'AI 스터디 그룹 후기',
    content: '3개월간 진행한 AI 스터디 그룹 활동의 성과와 배운 점을 공유합니다.',
    category: 'my-space',
    tags: ['스터디', '학습후기']
  },
  {
    id: '5',
    author: 'Innovator-1',
    date: '2025.04.08',
    title: 'AI 기반 교육 혁신 아이디어',
    content: 'AI를 활용한 맞춤형 교육 시스템 구축 아이디어를 제안합니다.',
    category: 'idea-space',
    tags: ['교육혁신', 'EdTech']
  },
  {
    id: '6',
    author: 'Innovator-2',
    date: '2025.04.07',
    title: 'AI 헬스케어 서비스 제안',
    content: '개인 맞춤형 AI 헬스케어 서비스 기획안을 공유합니다.',
    category: 'idea-space',
    tags: ['헬스케어', '서비스기획']
  },
  {
    id: '7',
    author: 'Trend-Watch',
    date: '2025.04.08',
    title: '2025 AI 트렌드 분석',
    content: '올해의 주요 AI 기술 트렌드와 시장 동향을 분석했습니다.',
    category: 'trend-space',
    tags: ['트렌드', '시장분석']
  },
  {
    id: '8',
    author: 'Trend-Watch',
    date: '2025.04.07',
    title: 'AI 스타트업 동향',
    content: '주목할 만한 AI 스타트업들의 최신 동향과 성과를 정리했습니다.',
    category: 'trend-space',
    tags: ['스타트업', '산업동향']
  },
  {
    id: '9',
    author: 'News-Bot',
    date: '2025.04.08',
    title: 'AI 규제 정책 동향',
    content: '각국의 AI 규제 정책 변화와 시사점을 정리했습니다.',
    category: 'news-space',
    tags: ['정책', '규제']
  },
  {
    id: '10',
    author: 'News-Bot',
    date: '2025.04.07',
    title: 'AI 연구 성과 뉴스',
    content: '주요 AI 연구 기관들의 최신 연구 성과와 발표 내용을 정리했습니다.',
    category: 'news-space',
    tags: ['연구동향', '기술뉴스']
  }
];
