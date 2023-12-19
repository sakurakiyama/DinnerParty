import { useState } from 'react';
/*
TODO: Add logic for erroring when longer than 500 chars 
*/
function AddDescription() {
  const [charsLength, setCharsLength] = useState<number>(0);

  return (
    <div className='flex flex-col w-[550px]'>
      <div className='font-black text-2xl md:text-3xl'>
        Next, let's describe your space
      </div>
      <div className='mt-4 md:text-base text-gray-500'>
        Share what makes your place special.
      </div>
      <textarea
        className='mt-8 border rounded-md outline-[var(--light-pink)] p-2 whitespace-normal h-48'
        id='title'
        onChange={(e) => setCharsLength(e.target.value.length)}
      ></textarea>
      <label htmlFor='title'></label>
      <div className='text-gray-500 font-black mt-3'>{charsLength}/500</div>
    </div>
  );
}

export default AddDescription;
