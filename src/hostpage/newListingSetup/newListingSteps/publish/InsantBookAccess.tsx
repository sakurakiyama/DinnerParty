import { RxLightningBolt } from 'react-icons/rx';
import { PiChats } from 'react-icons/pi';
import SelectableCards from '../../../../components/SelectableCards';
import { NewListingWizardContext } from '../../NewListingWizard';
import { useContext, useState, useEffect } from 'react';
import SalmonButton from '../../../../components/SalmonButton';
import { HostContext } from '../../../../App';

function InstantBookAccess() {
  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const [notValidated, setNotValidated] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (currentHostListing?.instantbook !== null) {
      setSelected(
        currentHostListing?.instantbook
          ? 'Use instant book'
          : 'Approve or decline requests'
      );
      setNotValidated(false);
    } else {
      setSelected('');
      setNotValidated(true);
    }
  }, [currentHostListing]);

  if (!currentHostListing) return;

  const updateBookingType = (bookingType: string) => {
    const instantBookValue = bookingType === 'Use instant book';
    setSelected(bookingType === selected ? '' : bookingType);

    if (selected) {
      setCurrentHostListing({
        ...currentHostListing,
        instantbook: instantBookValue,
      });
    }
  };

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
  };

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
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className='flex flex-col md:space-x-8 md:mt-auto justify-center items-center'>
        <div className='flex flex-col pt-10 md:pt-0 '>
          <div className='font-semibold text-2xl md:text-3xl'>
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
