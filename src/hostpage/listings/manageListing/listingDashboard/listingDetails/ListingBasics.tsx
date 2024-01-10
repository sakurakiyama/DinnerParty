import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';
import TextAndMultipleSelectionBlock from '../../components/TextAndMultipleSelectionBlock';
import { FaCircle } from 'react-icons/fa';
import SinglePlusMinusBlock from '../../components/SinglePlusMinusBlock';

function ListingBasics() {
  const [statusElement, setStatusElement] = useState<JSX.Element | string>('');
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const listingStatusOptions = [
    {
      key: 'Listed',
      selected: currentHostListing?.status === 'Listed',
      description: (
        <div className='flex flex-row items-center'>
          <FaCircle size={18} color={'green'} className='pr-2' />
          <span className='hidden sm:inline-block'>
            Listed - Guests can find your listing in search results and request
            or book available dates.
          </span>
          <span className='sm:hidden'>Listed</span>
        </div>
      ),
    },
    {
      key: 'Unlisted',
      selected: currentHostListing?.status === 'Ready',
      description: (
        <div className='flex flex-row items-center'>
          <FaCircle size={18} color={'grey'} className='pr-2' />
          <span className='hidden sm:inline-block'>
            Unlisted - Guests can’t book your listing or find it in search
            results.
          </span>
          <span className='sm:hidden'>Unlisted</span>
        </div>
      ),
    },
  ];

  const handleListingStatusSelection = (selection: string) => {
    if (!currentHostListing) return;

    switch (selection) {
      case 'Listed':
        setCurrentHostListing({ ...currentHostListing, status: selection });
        break;
      case 'Unlisted':
        setCurrentHostListing({ ...currentHostListing, status: 'Ready' });
    }
  };

  const getStatusDisplay = (status: string): JSX.Element | string => {
    let object;
    switch (status) {
      case 'Ready':
        object = listingStatusOptions.find(
          (option) => option.key === 'Unlisted'
        );
        break;

      case 'Listed':
        object = listingStatusOptions.find((option) => option.key === 'Listed');
        break;
    }
    if (object) return object.description;
    return 'Key not found';
  };

  useEffect(() => {
    if (currentHostListing) {
      const element = getStatusDisplay(currentHostListing.status);
      setStatusElement(element);
    }
  }, [currentHostListing]);

  const handleGuestCount = (operation: number) => {
    if (currentHostListing) {
      const existingHostListing = { ...currentHostListing };

      existingHostListing.guests = Math.max(
        0,
        existingHostListing?.guests + operation
      );
      setCurrentHostListing(existingHostListing);
    }
  };

  return (
    <div className='border-b w-full pt-8 pb-8' id='listingBasicsBlock'>
      <div className='pb-6 font-semibold text-lg'>Listing basics</div>
      <div className='space-y-8'>
        {/* Listing title */}
        <TextAndTextEditBlock
          display={'Listing title'}
          contents={currentHostListing?.title}
          caption={'Highlight what makes your place special.'}
          setterFunc={(title: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              title,
            });
          }}
        />
        {/* Listing description */}
        <TextAndTextEditBlock
          display={'Listing description'}
          contents={currentHostListing?.description}
          caption={
            'Give guests a sense of what it’s like to book your place, including why they’ll love staying there.'
          }
          setterFunc={(description: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              description,
            });
          }}
        />
        {/* Space Description  */}
        <TextAndTextEditBlock
          display={'Space description'}
          contents={currentHostListing?.spacedescription}
          caption={
            'Let guests know which parts of the space they’ll be able to access.'
          }
          setterFunc={(spacedescription: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              spacedescription,
            });
          }}
        />
        {/* Listing Status */}
        <TextAndMultipleSelectionBlock
          display={'Listing status'}
          contents={statusElement}
          caption={
            'When unlisted, guests can’t book your listing or find it in search results. When listed, guests can find your listing in search results and request or book available dates. '
          }
          selectableOptions={listingStatusOptions}
          handleSelect={handleListingStatusSelection}
        />
        {/* Guests */}
        <SinglePlusMinusBlock
          onMinusClick={() => handleGuestCount(-1)}
          onPlusClick={() => handleGuestCount(+1)}
          display={'Guests'}
          displayValue={currentHostListing?.guests || 0}
          isMinusDisabled={currentHostListing?.guests === 0}
        />
      </div>
    </div>
  );
}

export default ListingBasics;
