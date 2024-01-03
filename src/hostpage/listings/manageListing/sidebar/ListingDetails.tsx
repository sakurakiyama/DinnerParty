import { FiChevronDown } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';

function ListingDetails() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const listingDetailSections = [
    'Photos',
    'Listing basics',
    'Amenities',
    'Location',
    'Property and rooms',
    'Accessibility',
    'Guest safety',
  ];

  return (
    <div className='flex flex-col w-full'>
      {/* Header */}
      <div className='flex flex-row items-center'>
        <div>Listing Details</div>
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
          listingDetailSections.map((section) => {
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

export default ListingDetails;
