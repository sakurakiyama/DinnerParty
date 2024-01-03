import { FiChevronDown } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';

function PoliciesAndRules() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const policySections = [
    'Policies',
    'House rules',
    'Guest requirements',
    'Laws and regulations',
  ];

  return (
    <div className='flex flex-col w-full'>
      {/* Header */}
      <div className='flex flex-row items-center'>
        <div>Policies and rules</div>
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
          policySections.map((section) => {
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

export default PoliciesAndRules;
