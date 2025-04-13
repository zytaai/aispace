
'use client';

import React, { useState } from 'react';

interface Comment {
  id: number;
  content: string;
  author: string;
  replies?: Comment[];
}

const initialComments: Comment[] = [
  {
    id: 1,
    content: '첫 번째 댓글입니다.',
    author: '사용자1',
    replies: [
      {
        id: 2,
        content: '대댓글이에요!',
        author: '사용자2',
      },
    ],
  },
];

export default function CommentBox() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const next = {
      id: Date.now(),
      content: newComment,
      author: '익명',
    };
    setComments([...comments, next]);
    setNewComment('');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">댓글</h3>
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleAddComment}
      >
        댓글 작성
      </button>
      <ul className="space-y-2 mt-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-2 rounded">
            <p className="font-bold">{comment.author}</p>
            <p>{comment.content}</p>
            {comment.replies && (
              <ul className="pl-4 mt-2 space-y-1 border-l">
                {comment.replies.map((reply) => (
                  <li key={reply.id}>
                    <p className="text-sm font-semibold">{reply.author}</p>
                    <p className="text-sm">{reply.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
