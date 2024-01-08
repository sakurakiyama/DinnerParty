import { useContext } from 'react';
import { BrowsePageContext } from '../../BrowsePage';
import { GuestCategory } from '../../BrowsePage';
import { v4 as uuid } from 'uuid';
import PlusMinusButtons from '../../../components/PlusMinusButtons';

function GuestSelector() {
  const { guestContext } = useContext(BrowsePageContext);
  const { guests, setGuests } = guestContext;

  const handleCount = (category: GuestCategory, operation: number) => {
    const currentGuests = guests;

    for (const object of currentGuests) {
      if (object.category === category) {
        object.count = Math.max(0, object.count + operation);
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
              key={uuid()}
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
              <PlusMinusButtons
                isMinusDisabled={current.count === 0}
                onMinusClick={() => handleCount(current.category, -1)}
                onPlusClick={() => handleCount(current.category, +1)}
                displayValue={current.count}
              />
            </div>
          );
        })}
    </div>
  );
}

export default GuestSelector;
