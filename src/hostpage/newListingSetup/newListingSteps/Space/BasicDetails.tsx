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
  const { spaceContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { spaceDetails, setSpaceDetails } = spaceContext;
  const { currentView, setCurrentView } = newListingButtonsContext;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleCount = (category: keyof SpaceDetailProps, operation: string) => {
    const currentSpaceDetails = { ...spaceDetails };

    if (category in currentSpaceDetails) {
      currentSpaceDetails[category] =
        operation === 'Add'
          ? currentSpaceDetails[category] + 1
          : Math.max(0, currentSpaceDetails[category] - 1);
    }
    setSpaceDetails(currentSpaceDetails);
  };

  useEffect(() => {
    if (spaceDetails.guests) setNotValidated(false);
  }, [spaceDetails]);

  const handleView = (operation?: string) => {
    localStorage.setItem('spaceDetails', JSON.stringify(spaceDetails));
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  function capitalizeFirstLetter(str: string) {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='md:w-[550px] md:mt-auto justify-center items-center md:mx-auto'>
        <div className='pb-10 pt-10 md:pb-0 md:pt-0'>
          <div className='font-black text-2xl md:text-3xl '>
            Share some basics about your place
          </div>
          <div className='mt-4 text-gray-500 mb-2 md:mb-6'>
            You'll add more details later, like dining room set up.
          </div>
        </div>

        {Object.keys(spaceDetails)
          .filter((key) => ['diningAreas', 'bathrooms', 'guests'].includes(key))
          .map((key, index) => {
            const isLast = index === Object.keys(spaceDetails).length - 1;
            const isFirst = index === 0;

            const spaceDetailKey = key as keyof SpaceDetailProps;

            return (
              <div
                key={`${spaceDetailKey}+${index}`}
                className={`border-b pb-4 pt-4 flex flex-row justify-between ${
                  isFirst && 'pt-0'
                } ${isLast && 'pb-0 border-b-0'}`}
              >
                <div className='flex flex-col'>
                  <div className='text-sm'>
                    {capitalizeFirstLetter(spaceDetailKey)}
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <button
                    className={`${
                      spaceDetails[spaceDetailKey] === 0 ? 'text-slate-300' : ''
                    }`}
                    disabled={spaceDetails[spaceDetailKey] === 0}
                    onClick={() => handleCount(spaceDetailKey, 'Subtract')}
                  >
                    <CiCircleMinus className='pr-2 w-[35px] h-[35px]' />
                  </button>
                  <div className='w-[20px] text-center'>
                    {spaceDetails[spaceDetailKey]}
                  </div>
                  <button onClick={() => handleCount(spaceDetailKey, 'Add')}>
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
