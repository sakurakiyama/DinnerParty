import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { BsHouseDoor } from 'react-icons/bs';
import TextAndMultipleSelectionBlock from '../../components/TextAndMultipleSelectionBlock';
import SinglePlusMinusBlock from '../../components/SinglePlusMinusBlock';

function PropertyAndRooms() {
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [accessTypeElement, setAccessTypeElement] = useState<
    JSX.Element | string
  >('');

  const accessTypeOptions = [
    {
      key: 'An entire place',
      selected: currentHostListing?.accesstype === 'An entire place',
      description: (
        <div className='flex flex-row items-center'>
          <BsHouseDoor size={15} className='mr-2' />
          <span className='hidden sm:block'>
            An entire place - Guests will have the whole space to themselves
          </span>
          <span className='sm:hidden'>An entire place</span>
        </div>
      ),
    },
    {
      key: 'A room',
      selected: currentHostListing?.accesstype === 'A room',
      description: (
        <div className='flex items-center'>
          <MdOutlineMeetingRoom size={15} className='mr-2' />
          <span className='hidden sm:block'>
            A room - Guests will have access to select rooms (for example:
            backyard, kitchen, dining room etc)
          </span>
          <span className='sm:hidden'>A Room</span>
        </div>
      ),
    },
  ];

  const handleAccessTypeSelection = (selection: string) => {
    if (!currentHostListing) return;
    switch (selection) {
      case 'A room':
        setCurrentHostListing({
          ...currentHostListing,
          accesstype: selection,
        });
        break;
      case 'An entire place':
        setCurrentHostListing({
          ...currentHostListing,
          accesstype: 'An entire place',
        });
    }
  };

  const getAccessTypeDisplay = (accessType: string): JSX.Element | string => {
    let object;
    switch (accessType) {
      case 'A room':
        object = accessTypeOptions.find((option) => option.key === 'A room');
        break;

      case 'An entire place':
        object = accessTypeOptions.find(
          (option) => option.key === 'An entire place'
        );
        break;
    }
    if (object) return object.description;
    return 'Key not found';
  };

  useEffect(() => {
    if (currentHostListing && currentHostListing.accesstype) {
      const element = getAccessTypeDisplay(currentHostListing.accesstype);
      setAccessTypeElement(element);
    }
  }, [currentHostListing]);

  const handleBathroomCount = (operation: number) => {
    if (currentHostListing) {
      const existingHostListing = { ...currentHostListing };

      existingHostListing.bathrooms = Math.max(
        0,
        existingHostListing?.bathrooms + operation
      );
      setCurrentHostListing(existingHostListing);
    }
  };

  const handleDiningAreasCount = (operation: number) => {
    if (currentHostListing) {
      const existingHostListing = { ...currentHostListing };

      existingHostListing.diningareas = Math.max(
        0,
        existingHostListing?.diningareas + operation
      );
      setCurrentHostListing(existingHostListing);
    }
  };

  return (
    <div className='border-b w-full pt-8 pb-8' id='propertyAndRoomsBlock'>
      <div className='pb-6 font-semibold text-lg'>Property and rooms</div>
      <div className='space-y-8'>
        {/* Access Type */}
        <TextAndMultipleSelectionBlock
          display={'Access type'}
          contents={accessTypeElement}
          caption={
            'Choose a Access type that’s most like your place to set expectations for guests and help your listing appear in the right searches.'
          }
          selectableOptions={accessTypeOptions}
          handleSelect={handleAccessTypeSelection}
        />
        {/* Bathrooms */}
        <SinglePlusMinusBlock
          isMinusDisabled={currentHostListing?.bathrooms === 0}
          onMinusClick={() => handleBathroomCount(-1)}
          onPlusClick={() => handleBathroomCount(+1)}
          displayValue={currentHostListing?.bathrooms || 0}
          display={'Bathrooms'}
        />

        {/* Dining Areas */}
        <SinglePlusMinusBlock
          isMinusDisabled={currentHostListing?.diningareas === 0}
          onMinusClick={() => handleDiningAreasCount(-1)}
          onPlusClick={() => handleDiningAreasCount(+1)}
          displayValue={currentHostListing?.diningareas || 0}
          display={'Dining Areas'}
        />
      </div>
    </div>
  );
}

export default PropertyAndRooms;
