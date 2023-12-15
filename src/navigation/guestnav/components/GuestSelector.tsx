import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import { useContext } from 'react';
import { NavBarContext } from '../GuestNavbar';
import { GuestCategory } from '../GuestNavbar';
function GuestSelector() {
  const { guestContext } = useContext(NavBarContext);
  const { guests, setGuests } = guestContext;

  const handleCount = (category: GuestCategory, operation: string) => {
    const currentGuests = guests;

    for (const object of currentGuests) {
      if (object.category === category) {
        operation === 'Add' ? (object.count += 1) : (object.count -= 1);
      }
    }
    setGuests([...currentGuests]);
  };

  return (
    <div className='border rounded-lg min-w-[430px] shadow-sm p-8 mb-8'>
      {guests &&
        guests.map((current, index) => {
          const isLast = index === guests.length - 1;
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
                <div className='text-xs text-slate-500'>
                  {current.description}
                </div>
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

export default GuestSelector;
