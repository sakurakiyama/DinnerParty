import { useState, useContext, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';
import { isBlankString } from '../../../../utils';

function AddDescription() {
  const {
    marketingDetails,
    setMarketingDetails,
    currentView,
    setCurrentView,
    setSlideIn,
    slideIn,
  } = useContext(NewListingWizardContext)!;

  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setMarketingDetails({ ...marketingDetails, description });
  };

  useEffect(() => {
    if (
      !isBlankString(marketingDetails.description) &&
      marketingDetails.description.length <= 500
    )
      setNotValidated(false);
    else setNotValidated(true);
  }, [marketingDetails]);

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
      className={`flex flex-col h-full overflow-auto w-full ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      {' '}
      <div className='flex flex-col md:mt-auto mx-auto w-full md:w-[600px]'>
        <div className='font-black text-2xl md:text-3xl pt-10 md:pt-0 '>
          Next, let's describe your space
        </div>
        <div className='mt-4 md:text-base text-gray-500'>
          Share what makes your place special.
        </div>
        <textarea
          className={`mt-8 border rounded-md p-2 whitespace-normal h-48  ${
            marketingDetails.description.length > 500
              ? 'outline-rose-800 bg-rose-800/20'
              : 'outline-slate-500'
          }`}
          id='description'
          value={marketingDetails.description}
          onChange={handleDescription}
        ></textarea>
        <label htmlFor='description'></label>
        <div
          className={`font-black mt-3  ${
            marketingDetails.description.length > 500
              ? 'text-rose-800'
              : 'text-gray-500'
          }`}
        >
          {marketingDetails.description.length}/500
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

export default AddDescription;
