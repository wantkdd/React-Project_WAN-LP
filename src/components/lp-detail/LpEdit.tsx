import React, { useState, useRef } from 'react';
import { LpDetailData } from '../../types/lp-detail';
import { Tag } from '../../types/lp';
import { useUpdateLp } from '../../hooks/mutations/lp/useUpdateLp';
import { queryClient } from '../../App';

interface LpEditProps {
  lpData: LpDetailData;
  onCancel: () => void;
  onDelete: () => void;
}

const LpEdit: React.FC<LpEditProps> = ({ lpData, onCancel, onDelete }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [title, setTitle] = useState(lpData.title);
  const [content, setContent] = useState(lpData.content);
  const [thumbnail, setThumbnail] = useState(lpData.thumbnail);
  const [previewThumbnail, setPreviewThumbnail] = useState(lpData.thumbnail);
  const [tags, setTags] = useState<Tag[]>(lpData.tags || []);
  const [currentTag, setCurrentTag] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateLp, isPending: isUpdating } = useUpdateLp();

  const startEditing = (field: string) => {
    setEditingField(field);
  };

  const handleThumbnailClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewThumbnail(result);
        setThumbnail(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    const trimmed = currentTag.trim();
    if (trimmed) {
      const exists = tags.some(
        (tag) => tag.name.toLowerCase() === trimmed.toLowerCase()
      );
      if (!exists) {
        const newTag: Tag = {
          id: tags.length > 0 ? Math.max(...tags.map((t) => t.id)) + 1 : 1,
          name: trimmed,
        };
        setTags((prev) => [...prev, newTag]);
        setCurrentTag('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: Tag) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagToRemove.id));
  };

  const handleSaveChanges = () => {
    if (!title.trim()) {
      alert('제목은 빈칸일 수 없습니다.');
      return;
    }

    updateLp(
      {
        lpId: lpData.id,
        payload: {
          title,
          content,
          thumbnail,
          tags: tags.map((tag) => tag.name),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['lpDetail', lpData.id] });
          alert('LP가 성공적으로 업데이트되었습니다.');
          onCancel();
        },
      }
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-sm">
            {lpData.author?.name?.charAt(0) || '?'}
          </div>
          <span className="ml-3 text-sm text-gray-300">
            {lpData.author?.name || '익명'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button className="p-1 text-green-500" onClick={onCancel}>
            편집 취소
          </button>
          <button
            className="p-1 text-blue-500 hover:text-blue-400"
            onClick={handleSaveChanges}
            disabled={isUpdating}
          >
            {isUpdating ? '저장 중...' : '저장'}
          </button>
          <button
            className="p-1 text-red-400 hover:text-red-300"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="text-center my-4">
        {editingField === 'title' ? (
          <input
            type="text"
            className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1 text-xl font-bold w-full max-w-md mx-auto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditingField(null)}
            autoFocus
          />
        ) : (
          <h1
            className="text-xl font-bold cursor-pointer hover:bg-gray-800 hover:text-pink-400 px-2 py-1 rounded"
            onClick={() => startEditing('title')}
          >
            {title}
          </h1>
        )}
        <p className="text-sm text-gray-400">
          {new Date(lpData.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-center py-8 relative">
        <div
          className="w-64 h-64 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg cursor-pointer hover:opacity-80"
          onClick={handleThumbnailClick}
        >
          <img
            src={previewThumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-gray-900 rounded-full border-2 border-gray-700" />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <p className="absolute bottom-0 text-center text-sm text-gray-400 w-full">
          클릭하여 LP 이미지 변경
        </p>
      </div>

      <div className="p-6 text-center">
        {editingField === 'content' ? (
          <textarea
            className="bg-gray-800 text-white border border-gray-700 rounded p-2 w-full resize-vertical"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onBlur={() => setEditingField(null)}
            rows={4}
            autoFocus
          />
        ) : (
          <p
            className="text-sm text-gray-400 mb-4 cursor-pointer hover:bg-gray-800 hover:text-white px-2 py-1 rounded"
            onClick={() => startEditing('content')}
          >
            {content}
          </p>
        )}

        {editingField === 'tags' ? (
          <div className="mb-6 p-3 bg-gray-800 rounded">
            <div className="flex mb-2">
              <input
                type="text"
                className="flex-1 bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 mr-2"
                placeholder="태그 입력 후 Enter 또는 Add 버튼 클릭"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <button
                type="button"
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
                >
                  #{tag.name}
                  <button
                    type="button"
                    className="ml-2 text-pink-400 hover:text-pink-300"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-3 text-sm text-gray-400 hover:text-white"
              onClick={() => setEditingField(null)}
            >
              완료
            </button>
          </div>
        ) : (
          <div
            className="flex flex-wrap justify-center gap-2 mb-6 cursor-pointer hover:bg-gray-800 px-2 py-1 rounded"
            onClick={() => startEditing('tags')}
          >
            {tags.length > 0 ? (
              tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-xs"
                >
                  #{tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-xs">클릭하여 태그 추가</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LpEdit;
