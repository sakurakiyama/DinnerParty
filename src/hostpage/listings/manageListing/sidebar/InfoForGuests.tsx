import { FiChevronDown } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';

function InfoForGuests() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const guestInfoSections = ['Before booking', 'After booking'];

  return (
    <div className='flex flex-col w-full'>
      {/* Header */}
      <div className='flex flex-row items-center'>
        <div>Info for guests</div>
        <div className='flex'>
          {isOpen ? (
            <FiChevronDown
              onClick={() => setIsOpen(false)}
              className='w-[20px]'
            />
          ) : (
            <FiChevronRight
              className='w-[20px]'
              onClick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>
      <div className='space-y-2 pt-2'>
        {isOpen &&
          guestInfoSections.map((section) => {
            return (
              <ul className='flex flex-col pl-6'>
                <span>{section}</span>
              </ul>
            );
          })}
      </div>
    </div>
  );
}

export default InfoForGuests;
