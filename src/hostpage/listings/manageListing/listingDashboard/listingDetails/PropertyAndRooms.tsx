import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingInfoBlock from '../../components/ManageListingInfoBlock';

function PropertyAndRooms() {
  const [propertyTypeElement, setPropertyTypeElement] = useState<
    JSX.Element | string
  >('');
  const [roomsElement, setRoomsElement] = useState<JSX.Element | string>('');
  const { currentHostListing } = useContext(HostContext)!;

  useEffect(() => {
    if (currentHostListing) {
      const propertyTypeContent = (
        <div className='flex flex-col'>
          <div>Listing type: {currentHostListing.accesstype}</div>
          <div>Listing size: {currentHostListing.size || 'Not specified'}</div>
        </div>
      );
      setPropertyTypeElement(propertyTypeContent);

      const roomContent = (
        <div className='flex flex-col'>
          <div>Dining areas: {currentHostListing.diningareas}</div>
          <div>Bathrooms: {currentHostListing.bathrooms}</div>
        </div>
      );

      setRoomsElement(roomContent);
    }
  }, [currentHostListing]);

  return (
    <div className='border-b w-full pt-8 pb-8'>
      <div className='pb-6 font-black text-lg'>Property and rooms</div>
      <div className='space-y-8'>
        <ManageListingInfoBlock
          display={'Property type'}
          contents={propertyTypeElement}
          caption={
            'Choose a property type that’s most like your place to set expectations for guests and help your listing appear in the right searches.'
          }
        />
        <ManageListingInfoBlock
          display={'Rooms and spaces'}
          contents={roomsElement}
          caption={
            'Add or edit areas guests can use and mark any spaces they’ll share.'
          }
        />
      </div>
    </div>
  );
}

export default PropertyAndRooms;
