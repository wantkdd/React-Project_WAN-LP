import { useState } from 'react';
import AddLpModal from './addLp';

const AddButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-pink-400 rounded-full w-15 h-15 text-4xl flex justify-center items-center hover:bg-pink-500"
      >
        +
      </button>
      {open && <AddLpModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default AddButton;
