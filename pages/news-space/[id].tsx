
import {{ useRouter }} from 'next/router';
import {{ useEffect, useState }} from 'react';

type Post = {{
  id: string;
  title: string;
  content: string;
  date: string;
}};

type Comment = {{
  id: string;
  name: string;
  text: string;
  date: string;
}};

export default function {mode}Page() {{
  const router = useRouter();
  const id = router.query.id as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const category = '{section}';
  const storageKey = `${{category}}-posts`;

  useEffect(() => {{
    const saved = localStorage.getItem(storageKey);
    if (saved) {{
      const data = JSON.parse(saved);
      setPosts(data);
      if (id) {{
        const found = data.find((p: Post) => p.id === id);
        setPost(found || null);
        const cmt = localStorage.getItem(`comments-${{id}}`);
        if (cmt) setComments(JSON.parse(cmt));
      }}
    }}
  }}, [id]);

  const handleSave = () => {{
    const newPost: Post = {{
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString()
    }};
    const updated = [newPost, ...posts];
    localStorage.setItem(storageKey, JSON.stringify(updated));
    router.push(`/${{category}}`);
  }};

  const handleDelete = () => {{
    const updated = posts.filter(p => p.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    router.push(`/${{category}}`);
  }};

  const handleComment = () => {{
    if (!commentText.trim()) return;
    const newComment: Comment = {{
      id: Date.now().toString(),
      name: commentName || '익명',
      text: commentText,
      date: new Date().toISOString()
    }};
    const updated = [newComment, ...comments];
    localStorage.setItem(`comments-${{id}}`, JSON.stringify(updated));
    setComments(updated);
    setCommentText('');
    setCommentName('');
  }};

  if ('{mode}' === 'index') {{
    return (
      <div className="p-4">
        <h2>NEWS-SPACE</h2>
        <button onClick={{() => router.push(`/${{category}}/new`)}}>글쓰기</button>
        <ul>
          {{posts.map(p => (
            <li key={{p.id}}>
              <a href={`/${{category}}/${{p.id}}`}>{{p.title}}</a>
            </li>
          ))}}
        </ul>
      </div>
    );
  }}

  if ('{mode}' === 'new') {{
    return (
      <div className="p-4">
        <h2>새 글쓰기 - {section}</h2>
        <input className="border w-full" value={{title}} onChange={{e => setTitle(e.target.value)}} placeholder="제목" />
        <textarea className="border w-full" value={{content}} onChange={{e => setContent(e.target.value)}} rows={{6}} />
        <button onClick={{handleSave}}>저장</button>
      </div>
    );
  }}

  if (post) {{
    return (
      <div className="p-4">
        <h2>{{post.title}}</h2>
        <p>{{post.content}}</p>
        <p className="text-xs text-gray-500">{{new Date(post.date).toLocaleString()}}</p>
        <button onClick={{handleDelete}} className="text-red-500">삭제</button>
        <div className="mt-6 border-t pt-4">
          <h3>댓글</h3>
          <input className="border w-full" value={{commentName}} onChange={{e => setCommentName(e.target.value)}} placeholder="이름 (선택)" />
          <textarea className="border w-full" value={{commentText}} onChange={{e => setCommentText(e.target.value)}} />
          <button onClick={{handleComment}}>댓글 작성</button>
          <ul>
            {{comments.map(c => (
              <li key={{c.id}} className="border-b py-1">
                <strong>{{c.name}}</strong>: {{c.text}}<br />
                <span className="text-xs text-gray-400">{{new Date(c.date).toLocaleString()}}</span>
              </li>
            ))}}
          </ul>
        </div>
      </div>
    );
  }}

  return <div className="p-4">글을 찾을 수 없습니다.</div>;
}}
