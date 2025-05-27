import { useEffect, useState, useRef } from 'react';
import { getMyInfo } from '../apis/auth';
import { ResponseMyInfoDto } from '../types/auth';
import useUpdateUserInfo from '../hooks/mutations/user/useUpdateMyInfo';
import { useAuth } from '../context/AuthContext';

const MyPage = () => {
  const [data, setData] = useState<ResponseMyInfoDto>({} as ResponseMyInfoDto);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [previewAvatar, setPreviewAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateUserInfo, isPending } = useUpdateUserInfo();
  const { setUserInfo } = useAuth();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);

        setName(response.data.name);
        setBio(response.data.bio || '');
        setAvatar(response.data.avatar || '');
        setPreviewAvatar(response.data.avatar || '');
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  const handleAvatarClick = () => {
    if (editMode && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewAvatar(result);
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('이름은 빈칸일 수 없습니다.');
      return;
    }

    updateUserInfo(
      { name, bio: bio || undefined, avatar: avatar || undefined },
      {
        onSuccess: () => {
          alert('정보가 수정되었습니다.');
          setData((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              name,
              bio: bio || '',
              avatar: avatar || '',
            },
          }));
          setUserInfo({
            ...data.data,
            name,
            bio: bio || null,
            avatar: avatar || null,
          });
          setEditMode(false);
        },
      }
    );
  };

  return (
    <main className="min-h-screen bg-gray-800 text-white">
      <section className="max-w-4xl mx-auto mt-10 p-6 bg-gray-700 rounded-lg">
        <div className="p-8 flex flex-col md:flex-row">
          <div className="mb-4 md:mb-0 md:mr-8">
            <div
              className={`w-32 h-32 bg-gray-600 rounded-full flex justify-center items-center overflow-hidden ${
                editMode ? 'cursor-pointer hover:opacity-80' : ''
              }`}
              onClick={handleAvatarClick}
            >
              {previewAvatar ? (
                <img
                  src={previewAvatar}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-4xl">없음</span>
              )}
              {editMode && (
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              )}
            </div>
          </div>

          <div className="flex-1">
            {!editMode ? (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  {data.data?.name}님 환영합니다
                </h2>
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">이메일</p>
                  <p className="font-medium">{data.data?.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-400 text-sm">소개</p>
                  <p>{data.data?.bio || '소개가 없습니다.'}</p>
                </div>
                <button
                  className="bg-blue-500 px-4 py-2 rounded mt-4"
                  onClick={() => setEditMode(true)}
                >
                  설정
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block mb-1">이름 *</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded text-black"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1">소개</label>
                  <textarea
                    className="w-full p-2 rounded text-black"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-green-500 px-4 py-2 rounded"
                    onClick={handleSubmit}
                    disabled={isPending}
                  >
                    저장
                  </button>
                  <button
                    className="bg-gray-500 px-4 py-2 rounded"
                    onClick={() => {
                      setEditMode(false);
                      setPreviewAvatar(avatar);
                    }}
                  >
                    취소
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
