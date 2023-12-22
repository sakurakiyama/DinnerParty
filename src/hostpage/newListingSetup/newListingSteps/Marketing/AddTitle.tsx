import { useState, useContext, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';
import { isBlankString } from '../../../../utils';

function AddTitle() {
  const { marketingContext, newListingButtonsContext } = useContext(
    NewListingWizardContext
  );
  const { marketingDetails, setMarketingDetails } = marketingContext;
  const { currentView, setCurrentView } = newListingButtonsContext;
  const [notValidated, setNotValidated] = useState<boolean>(true);

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value;
    setMarketingDetails({ ...marketingDetails, title });
  };

  useEffect(() => {
    if (
      !isBlankString(marketingDetails.title) &&
      marketingDetails.title.length <= 32
    )
      setNotValidated(false);
    else setNotValidated(true);
  }, [marketingDetails]);

  const handleView = (operation?: string) => {
    if (operation === 'Forward') {
      setCurrentView(currentView + 1);
    } else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  return (
    <div className='flex flex-col h-full overflow-auto'>
      <div className='flex flex-col md:mt-auto mx-auto'>
        <div className='font-black text-2xl md:text-3xl pt-10 md:pt-0'>
          Now, let's give your house a title
        </div>
        <div className='mt-4 md:text-base text-gray-500'>
          Short titles work best. Have fun with it—you can always change it
          later.
        </div>
        <textarea
          className={`mt-8 border rounded-md p-2 whitespace-normal h-20 ${
            marketingDetails.title.length > 32
              ? 'outline-rose-800 bg-rose-800/20'
              : 'outline-slate-500'
          }`}
          id='title'
          value={marketingDetails.title}
          onChange={handleTitleUpdate}
        ></textarea>
        <label htmlFor='title'></label>
        <div
          className={`font-black mt-3 ${
            marketingDetails.title.length > 32
              ? 'text-rose-800'
              : 'text-gray-500'
          }`}
        >
          {marketingDetails.title.length}/32
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

export default AddTitle;
