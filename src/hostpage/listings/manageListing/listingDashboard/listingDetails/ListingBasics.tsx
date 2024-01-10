import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import ManageListingTextBlock from '../../components/ManageListingTextBlock';
import ManageListingSelectionBlock from '../../components/ManageListingSelectionBlock';
import PlusMinusButtons from '../../../../../components/PlusMinusButtons';
import { FaCircle } from 'react-icons/fa';

function ListingBasics() {
  const [statusElement, setStatusElement] = useState<JSX.Element | string>('');
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const listingStatusOptions = [
    {
      key: 'Listed',
      selected: currentHostListing?.status === 'Listed' ? true : false,
      description: (
        <div className='flex flex-row items-center text-sm'>
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
      selected: currentHostListing?.status === 'Ready' ? true : false,
      description: (
        <div className='flex flex-row items-center text-sm'>
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

  function getStatusDisplay(status: string): JSX.Element | string {
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
  }

  useEffect(() => {
    if (currentHostListing) {
      listingStatusOptions.map((option) => {
        switch (option.key) {
          case 'Listed':
            option.selected = currentHostListing.status === 'Listed';
            break;
          case 'Unlisted':
            option.selected = currentHostListing.status === 'Ready';
            break;
        }
        return option;
      });

      const element = getStatusDisplay(currentHostListing.status);
      setStatusElement(element);
    }
  }, [currentHostListing]);

  const handleCount = (operation: number) => {
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
      <div className='pb-6 font-black text-lg'>Listing basics</div>
      <div className='space-y-8'>
        {/* Listing title */}
        <ManageListingTextBlock
          display={'Listing title'}
          contents={currentHostListing?.title}
          caption={'Highlight what makes your place special.'}
        />
        {/* Listing description */}
        <ManageListingTextBlock
          display={'Listing description'}
          contents={currentHostListing?.description}
          caption={
            'Give guests a sense of what it’s like to book your place, including why they’ll love staying there.'
          }
        />
        {/* Space Description  */}
        <ManageListingTextBlock
          display={'Space description'}
          contents={currentHostListing?.spacedescription}
          caption={
            'Let guests know which parts of the space they’ll be able to access.'
          }
        />
        {/* Listing Status */}
        <ManageListingSelectionBlock
          display={'Listing status'}
          contents={statusElement}
          caption={
            'When unlisted, guests can’t book your listing or find it in search results. When listed, guests can find your listing in search results and request or book available dates. '
          }
          selectableOptions={listingStatusOptions}
        />
        {/* Guests */}
        <div className='flex flex-row items-center'>
          <div className='w-full'>Guests</div>
          <PlusMinusButtons
            isMinusDisabled={currentHostListing?.guests === 0}
            onMinusClick={() => handleCount(-1)}
            onPlusClick={() => handleCount(+1)}
            displayValue={currentHostListing?.guests || 0}
          />
        </div>
      </div>
    </div>
  );
}

export default ListingBasics;
