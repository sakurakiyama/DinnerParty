import { useState, useContext, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';
/*
TODO: Add logic for erroring when longer than 500 chars 
*/
function AddDescription() {
  const { marketingContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { marketingDetails, setMarketingDetails } = marketingContext;
  const { currentView, setCurrentView } = newListingButtonsContext;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    setMarketingDetails({ ...marketingDetails, description });
  };

  useEffect(() => {
    if (
      marketingDetails.description &&
      marketingDetails.description.length <= 500
    )
      setNotValidated(false);
    else setNotValidated(true);
  }, [marketingDetails]);

  const handleView = (operation?: string) => {
    localStorage.setItem('marketingDetails', JSON.stringify(marketingDetails));
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  return (
    <div className='flex flex-col h-full overflow-auto w-full'>
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
              : 'outline-[var(--light-pink)]'
          }`}
          id='title'
          onChange={handleDescription}
        ></textarea>
        <label htmlFor='title'></label>
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
