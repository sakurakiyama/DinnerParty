import { useContext, useState, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';
import PlusMinusButtons from '../../../../components/PlusMinusButtons';
import { HostContext } from '../../../../App';

type BasicDetailProps = {
  guests: number;
  diningareas: number;
  bathrooms: number;
};

function BasicDetails() {
  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const [notValidated, setNotValidated] = useState<boolean>(true);

  useEffect(() => {
    if (currentHostListing?.guests) setNotValidated(false);
    else {
      setNotValidated(true);
    }
  }, [currentHostListing]);

  if (!currentHostListing) return;

  const handleCount = (key: keyof BasicDetailProps, operation: number) => {
    const listing = { ...currentHostListing };
    if (key in listing) {
      listing[key] = Math.max(0, listing[key] + operation);
    }
    setCurrentHostListing(listing);
  };

  const items: { key: keyof BasicDetailProps; category: string }[] = [
    { key: 'guests', category: 'Guests' },
    { key: 'diningareas', category: 'Dining Areas' },
    { key: 'bathrooms', category: 'Bathrooms' },
  ];

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setSlideIn('Right');
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') {
      setSlideIn('Left');
      setCurrentView(currentView - 1);
    }
  };
  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className='md:w-[550px] md:mt-auto justify-center items-center md:mx-auto'>
        <div className='pb-10 pt-10 md:pb-0 md:pt-0'>
          <div className='font-semibold text-2xl md:text-3xl '>
            Share some basics about your place
          </div>
          <div className='mt-4 text-gray-500 mb-2 md:mb-6'>
            You'll add more details later, like dining room set up.
          </div>
        </div>

        {items.map((currentItem, index) => {
          const isLast = index === items.length - 1;
          return (
            <div
              key={`${currentItem.key}+${index}`}
              className={`flex flex-row justify-between p-2 items-center ${
                isLast ? '' : 'border-b'
              }`}
            >
              <div className='flex flex-col'>
                <div className='text-sm'>{currentItem.category}</div>
              </div>
              <PlusMinusButtons
                isMinusDisabled={currentHostListing[currentItem.key] === 0}
                onMinusClick={() => handleCount(currentItem.key, -1)}
                onPlusClick={() => handleCount(currentItem.key, +1)}
                displayValue={currentHostListing[currentItem.key]}
              />
            </div>
          );
        })}
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

export default BasicDetails;
