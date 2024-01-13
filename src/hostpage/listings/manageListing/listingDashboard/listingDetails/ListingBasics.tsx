import { useContext, useEffect, useState } from 'react';
import { HostContext } from '../../../../../App';
import TextAndTextEditBlock from '../../components/TextAndTextEditBlock';
import TextAndMultipleSelectionBlock from '../../components/TextAndMultipleSelectionBlock';
import { FaCircle } from 'react-icons/fa';
import SinglePlusMinusBlock from '../../components/SinglePlusMinusBlock';

type OriginalListingBasics = {
  title: string;
  description: string;
  spacedescription: string;
  guests: number;
  status: string;
};
function ListingBasics() {
  const [statusElement, setStatusElement] = useState<JSX.Element | string>('');
  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const [originalListingBasics, setOriginalListingBasics] =
    useState<OriginalListingBasics>({
      title: '',
      description: '',
      spacedescription: '',
      guests: 0,
      status: '',
    });

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

      if (!initialSetupDone) {
        setOriginalListingBasics({
          title: currentHostListing.title,
          description: currentHostListing.description,
          spacedescription: currentHostListing.spacedescription,
          guests: currentHostListing.guests,
          status: currentHostListing.status,
        });
        setInitialSetupDone(true);
      }
    }
  }, [currentHostListing]);

  return (
    <div className='border-b w-full pt-8 pb-8' id='listingBasicsBlock'>
      <div className='pb-6 font-semibold text-lg'>Listing basics</div>
      <div className='space-y-8'>
        {/* Listing title */}
        <TextAndTextEditBlock
          display={'Listing title'}
          contents={currentHostListing?.title}
          caption={'Highlight what makes your place special.'}
          onChange={(title: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              title,
            });
          }}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              title: originalListingBasics.title,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;

            setOriginalListingBasics({
              ...originalListingBasics,
              title: currentHostListing.title,
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
          onChange={(description: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              description,
            });
          }}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              description: originalListingBasics.description,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;
            setOriginalListingBasics({
              ...originalListingBasics,
              description: currentHostListing.description,
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
          onChange={(spacedescription: string) => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              spacedescription,
            });
          }}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              spacedescription: originalListingBasics.spacedescription,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;

            setOriginalListingBasics({
              ...originalListingBasics,
              spacedescription: currentHostListing.spacedescription,
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
          onSelect={handleListingStatusSelection}
          onCancel={() => {
            if (!currentHostListing) return;
            setCurrentHostListing({
              ...currentHostListing,
              status: originalListingBasics.status,
            });
          }}
          onSave={() => {
            if (!currentHostListing) return;

            setOriginalListingBasics({
              ...originalListingBasics,
              status: currentHostListing.status,
            });
          }}
        />
        {/* Guests */}
        <SinglePlusMinusBlock
          onChange={(operation: number) => {
            if (!currentHostListing) return;
            const listing = { ...currentHostListing };

            listing.guests = Math.max(0, listing?.guests + operation);
            setCurrentHostListing(listing);
            return listing;
          }}
          display={'Guests'}
          displayValue={currentHostListing?.guests || 0}
          isMinusDisabled={currentHostListing?.guests === 0}
        />
      </div>
    </div>
  );
}

export default ListingBasics;
