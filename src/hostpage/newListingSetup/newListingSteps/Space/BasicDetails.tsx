import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import { useState } from 'react';

interface BasicSpaceDetail {
  count: number;
  category: string;
}

function BasicDetails() {
  const [basicSpaceDetails, setBasicSpaceDetails] = useState<
    BasicSpaceDetail[]
  >([
    { count: 0, category: 'Guests' },
    { count: 0, category: 'Dining areas' },
    { count: 0, category: 'Bathrooms' },
  ]);

  const handleCount = (category: string, operation: string) => {
    const currentBasicSpaceDetails = basicSpaceDetails;
    for (const object of currentBasicSpaceDetails) {
      if (object.category === category) {
        operation === 'Add' ? (object.count += 1) : (object.count -= 1);
      }
    }
    setBasicSpaceDetails([...currentBasicSpaceDetails]);
  };
  return (
    <div className='md:w-[550px]'>
      <div className='pb-10 pt-10 md:pb-0 md:pt-0'>
        <div className='font-black text-2xl md:text-3xl '>
          Share some basics about your place
        </div>
        <div className='mt-4 text-gray-500 mb-6'>
          You'll add more details later, like dining room set up.
        </div>
      </div>

      {basicSpaceDetails &&
        basicSpaceDetails.map((current, index) => {
          const isLast = index === basicSpaceDetails.length - 1;
          const isFirst = index === 0;
          return (
            <div
              key={`${current.category}+${index}`}
              className={`border-b pb-4 pt-4 flex flex-row justify-between ${
                isFirst && 'pt-0'
              } ${isLast && 'pb-0 border-b-0'}`}
            >
              <div className='flex flex-col'>
                <div className='text-sm'>{current.category}</div>
              </div>
              <div className='flex justify-center items-center'>
                <button
                  className={`${current.count === 0 ? 'text-slate-300' : ''}`}
                  disabled={current.count === 0}
                  onClick={() => handleCount(current.category, 'Subtract')}
                >
                  <CiCircleMinus className='pr-2 w-[35px] h-[35px]' />
                </button>
                <div className='w-[20px] text-center'>{current.count}</div>
                <button onClick={() => handleCount(current.category, 'Add')}>
                  <CiCirclePlus className='pl-2 w-[35px] h-[35px]' />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default BasicDetails;
