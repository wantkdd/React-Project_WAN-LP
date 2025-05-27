import React, { useState, useRef } from 'react';
import { CreateLpDto, Tag } from '../../types/lp';
import usePostLp from '../../hooks/mutations/lp/usePostLp';
import { uploadImage } from '../../apis/addLp';

const AddLp = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const { mutate: createLp, isPending } = usePostLp();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const uploadedUrl = await uploadImage(file);
      setThumbnail(uploadedUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleCreateLp = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    const lpData: CreateLpDto = {
      title,
      content,
      thumbnail,
      published: true,
      tags,
    };

    createLp(lpData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error) => {
        console.error('LP 생성 실패:', error);
        alert('LP 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-600 rounded-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-5 text-gray-300 hover:text-white text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-semibold mb-1">사진</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full"
              onChange={handleFileChange}
            />
            {thumbnail && (
              <div className="mt-2">
                <img
                  src={thumbnail}
                  alt="썸네일 미리보기"
                  className="max-w-full h-auto rounded"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">이름</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="LP NAME"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">내용</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              placeholder="LP CONTENT"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">태그</label>
            <div className="flex">
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mr-2"
                placeholder="LP TAG"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), handleAddTag())
                }
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center bg-gray-200 text-gray-800 px-2 py-1 rounded"
                >
                  #{tag.name}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="button"
              className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded font-semibold"
              onClick={handleCreateLp}
              disabled={isPending}
            >
              {isPending ? '생성 중...' : 'ADD LP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLp;
