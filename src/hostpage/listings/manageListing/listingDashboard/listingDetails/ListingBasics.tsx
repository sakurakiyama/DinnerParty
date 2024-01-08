import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingInfoBlock from '../../components/ManageListingInfoBlock';
import PlusMinusButtons from '../../../../../components/PlusMinusButtons';
import { FaCircle } from 'react-icons/fa';

function ListingBasics() {
  const [statusElement, setStatusElement] = useState<JSX.Element | string>('');
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  function getStatusDisplay(status: string): JSX.Element {
    let iconColor, statusText;

    switch (status) {
      case 'Ready':
        iconColor = 'grey';
        statusText =
          'Unlisted - Guests can’t book your listing or find it in search results.';
        break;

      case 'Listed':
        iconColor = 'green';
        statusText =
          'Listed - Guests can find your listing in search results and request or book available dates.';
        break;

      default:
        iconColor = 'grey';
        statusText = '';
    }

    const element = (
      <div className='flex flex-row items-center'>
        <FaCircle size={18} color={iconColor} className='pr-2' />
        <span className='hidden sm:inline-block'>{statusText}</span>
        <span className='sm:hidden'>
          {status === 'Ready' ? 'Unlisted' : 'Listed'}
        </span>
      </div>
    );

    return element;
  }

  useEffect(() => {
    if (currentHostListing) {
      const element = getStatusDisplay(currentHostListing.status);
      setStatusElement(element);
    }
  }, [currentHostListing]);

  if (!currentHostListing) return;

  const handleCount = (operation: number) => {
    const existingHostListing = { ...currentHostListing };

    if (existingHostListing?.guests && existingHostListing.listingid) {
      existingHostListing.guests = Math.max(
        0,
        existingHostListing?.guests + operation
      );
      setCurrentHostListing(existingHostListing);
    }
  };

  return (
    <div className='border-b w-full pt-8 pb-8'>
      <div className='pb-6 font-black text-lg'>Listing basics</div>
      <div className='space-y-8'>
        {/* Listing title */}
        <ManageListingInfoBlock
          display={'Listing title'}
          contents={currentHostListing?.title}
          caption={'Highlight what makes your place special.'}
        />
        {/* Listing description */}
        <ManageListingInfoBlock
          display={'Listing description'}
          contents={currentHostListing?.description}
          caption={
            'Give guests a sense of what it’s like to book your place, including why they’ll love staying there.'
          }
        />
        {/* Space Description  */}
        <ManageListingInfoBlock
          display={'Space description'}
          contents={currentHostListing?.spacedescription}
          caption={
            'Let guests know which parts of the space they’ll be able to access.'
          }
        />
        {/* Listing Status */}
        <ManageListingInfoBlock
          display={'Listing status'}
          contents={statusElement}
        />
        {/* Guests */}
        <div className='flex flex-row items-center'>
          <div className='w-full'>Guests</div>
          <PlusMinusButtons
            isMinusDisabled={currentHostListing?.guests === 0}
            onMinusClick={() => handleCount(-1)}
            onPlusClick={() => handleCount(+1)}
            displayValue={currentHostListing?.guests}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingBasics;
