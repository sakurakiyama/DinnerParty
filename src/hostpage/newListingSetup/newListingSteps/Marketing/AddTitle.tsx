import { useState } from 'react';
/*
TODO: Add logic for erroring when longer than 32 chars 
*/
function AddTitle() {
  const [charsLength, setCharsLength] = useState<number>(0);

  return (
    <div className='flex flex-col'>
      <div className='font-black text-2xl md:text-3xl'>
        Now, let's give your house a title
      </div>
      <div className='mt-4 md:text-base text-gray-500'>
        Short titles work best. Have fun with it—you can always change it later.
      </div>
      <textarea
        className='mt-8 border rounded-md outline-[var(--light-pink)] p-2 whitespace-normal h-20'
        id='title'
        onChange={(e) => setCharsLength(e.target.value.length)}
      ></textarea>
      <label htmlFor='title'></label>
      <div className='text-gray-500 font-black mt-3'>{charsLength}/32</div>
    </div>
  );
}

export default AddTitle;
