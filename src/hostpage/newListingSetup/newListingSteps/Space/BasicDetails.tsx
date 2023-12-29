import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import { useContext, useState, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';

type SpaceDetailProps = {
  guests: number;
  diningAreas: number;
  bathrooms: number;
};

function BasicDetails() {
  const {
    spaceDetails,
    setSpaceDetails,
    currentView,
    setCurrentView,
    setSlideIn,
    slideIn,
  } = useContext(NewListingWizardContext)!;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleCount = (key: keyof SpaceDetailProps, operation: string) => {
    const currentSpaceDetails = { ...spaceDetails };

    if (key in currentSpaceDetails) {
      currentSpaceDetails[key] =
        operation === 'Add'
          ? currentSpaceDetails[key] + 1
          : Math.max(0, currentSpaceDetails[key] - 1);
    }
    setSpaceDetails(currentSpaceDetails);
  };

  const items: { key: keyof SpaceDetailProps; category: string }[] = [
    { key: 'guests', category: 'Guests' },
    { key: 'diningAreas', category: 'Dining Areas' },
    { key: 'bathrooms', category: 'Bathrooms' },
  ];

  useEffect(() => {
    if (spaceDetails.guests) setNotValidated(false);
    else {
      setNotValidated(true);
    }
  }, [spaceDetails]);

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
          <div className='font-black text-2xl md:text-3xl '>
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
              <div className='flex justify-center items-center'>
                <button
                  className={`${
                    spaceDetails[currentItem.key] === 0 ? 'text-slate-300' : ''
                  }`}
                  disabled={spaceDetails[currentItem.key] === 0}
                  onClick={() => handleCount(currentItem.key, 'Subtract')}
                >
                  <CiCircleMinus className='pr-2 w-[35px] h-[35px]' />
                </button>
                <div className='w-[20px] text-center'>
                  {spaceDetails[currentItem.key]}
                </div>
                <button onClick={() => handleCount(currentItem.key, 'Add')}>
                  <CiCirclePlus className='pl-2 w-[35px] h-[35px]' />
                </button>
              </div>
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
