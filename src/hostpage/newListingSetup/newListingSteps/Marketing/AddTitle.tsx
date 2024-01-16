import { useState, useContext, useEffect } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';
import { isBlankString } from '../../../../utils';
import { HostContext } from '../../../../App';

function AddTitle() {
  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

  const { currentHostListing, setCurrentHostListing } =
    useContext(HostContext)!;

  const [notValidated, setNotValidated] = useState<boolean>(true);

  useEffect(() => {
    if (
      !isBlankString(currentHostListing?.title || '') &&
      currentHostListing?.title &&
      currentHostListing?.title?.length <= 32
    )
      setNotValidated(false);
    else setNotValidated(true);
  }, [currentHostListing]);

  if (!currentHostListing) return;

  const handleTitleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const title = e.target.value;
    setCurrentHostListing({ ...currentHostListing, title });
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

  return (
    <div
      className={`flex flex-col h-full overflow-auto ${
        slideIn === 'Left' ? 'animate-slideInLeft' : 'animate-slideInRight'
      }`}
    >
      <div className='flex flex-col md:mt-auto mx-auto'>
        <div className='font-semibold text-2xl md:text-3xl pt-10 md:pt-0'>
          Now, let's give your house a title
        </div>
        <div className='mt-4 text-sm md:text-base text-gray-500'>
          Short titles work best. Have fun with it—you can always change it
          later.
        </div>
        <textarea
          className={`mt-8 border rounded-md p-2 whitespace-normal h-20 text-sm md:text-base ${
            currentHostListing.title.length > 32
              ? 'outline-rose-800 bg-rose-800/20'
              : 'outline-slate-500'
          }`}
          id='title'
          value={currentHostListing?.title}
          onChange={handleTitleUpdate}
        ></textarea>
        <label htmlFor='title'></label>
        <div
          className={`font-semibold mt-3 ${
            currentHostListing.title.length > 32
              ? 'text-rose-800'
              : 'text-gray-500'
          }`}
        >
          {currentHostListing.title.length}/32
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
