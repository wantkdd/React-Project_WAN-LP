import React, { useState, useRef, useEffect } from 'react';
import type { Comment } from '../../types/lp-detail';

interface CommentProps {
  comment: Comment;
  isMyComment: boolean;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  isMyComment,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmitEdit = () => {
    if (!editedContent.trim()) return;
    onUpdate(comment.id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="py-3 border-b border-gray-800">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
          {comment.author.avatar ? (
            <img
              src={comment.author.avatar}
              alt={comment.author.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            comment.author.name.charAt(0)
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-sm">{comment.author.name}</span>
            <div className="flex items-center">
              <span className="text-xs text-gray-400 mr-2">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>

              {isMyComment && (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-400 hover:text-white p-1"
                    aria-label="더 보기"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      ⁝
                    </div>
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-24 bg-gray-800 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1 text-xs text-gray-300 hover:bg-gray-700"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            onDelete(comment.id);
                            setIsMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-1 text-xs text-gray-300 hover:bg-gray-700"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <>
              <textarea
                className="w-full bg-gray-800 text-sm p-2 border border-gray-600 rounded"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 text-sm"
                >
                  취소
                </button>
                <button
                  onClick={handleSubmitEdit}
                  className="text-pink-500 text-sm"
                >
                  저장
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-300">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
