import { RxLightningBolt } from 'react-icons/rx';
import { PiChats } from 'react-icons/pi';
import SelectableCards from '../../../../components/SelectableCards';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState, useEffect } from 'react';
import SalmonButton from '../../../../components/SalmonButton';

function InstantBookAccess() {
  const { publishingContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { publishingDetails, setPublishingDetails } = publishingContext;
  const { currentView, setCurrentView } = newListingButtonsContext;
  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(
    publishingDetails.instantBook
  );

  const updateBookingType = (bookingType: string) => {
    if (selected === bookingType) {
      setSelected('');
      setPublishingDetails({ ...publishingDetails, instantBook: '' });
    } else {
      setSelected(bookingType);
      setPublishingDetails({ ...publishingDetails, instantBook: bookingType });
    }
  };

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  useEffect(() => {
    if (publishingDetails.instantBook) setNotValidated(false);
    else setNotValidated(true);
  }, [publishingDetails]);

  const accessTypes = [
    {
      key: 'instantbook',
      image: <RxLightningBolt size={30} />,
      header: 'Use instant book',
      caption: 'Guests can book automatically',
    },
    {
      key: 'approve',
      image: <PiChats size={30} />,
      header: 'Approve or decline requests',
      caption: 'Guests must ask if they can book',
    },
  ];
  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='flex flex-col md:space-x-8 md:mt-auto justify-center items-center'>
        <div className='flex flex-col pt-10 md:pt-0 '>
          <div className='font-black text-2xl md:text-3xl'>
            Decide how you’ll confirm reservations
          </div>
          <SelectableCards
            cards={accessTypes}
            handleSelectableCardClick={updateBookingType}
            currentSelection={selected}
          />
        </div>
      </div>
      <div className='flex justify-center mb-8 mt-auto pt-6'>
        <div className='flex w-full justify-between ml-4 mr-4'>
          <SalmonButton
            display={'Back'}
            handleClick={handleView}
            operation={'Backward'}
            disabled={false}
          />
          <SalmonButton
            display={'Next'}
            handleClick={handleView}
            operation={'Forward'}
            disabled={notValidated}
          />
        </div>
      </div>
    </div>
  );
}

export default InstantBookAccess;
