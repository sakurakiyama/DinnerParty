import { NewListingWizardContext } from './NewListingWizard';
import { useContext } from 'react';
import SalmonButton from '../../components/SalmonButton';

function NewListingButtons() {
  const { newListingButtonsContext } = useContext(NewListingWizardContext);
  const { currentView, setCurrentView, pages, saveListing } =
    newListingButtonsContext;

  const handleView = (operation?: string) => {
    if (operation === 'Forward') setCurrentView(currentView + 1);
    else if (operation === 'Backward') setCurrentView(currentView - 1);
  };

  return (
    <div className='flex justify-center mb-8 mt-auto'>
      {/* Back button */}
      {currentView !== 0 && currentView !== pages.length - 1 && (
        <div className='flex w-full justify-between ml-4 mr-4'>
          <SalmonButton
            display={'Back'}
            handleClick={handleView}
            operation={'Backward'}
          />
          <SalmonButton
            display={'Next'}
            handleClick={handleView}
            operation={'Forward'}
          />
        </div>
      )}
      {currentView === 0 && (
        <SalmonButton
          display={'Get started'}
          handleClick={handleView}
          operation={'Forward'}
        />
      )}
      {currentView === pages.length - 1 && (
        <div className='flex w-full justify-between ml-4 mr-4'>
          <SalmonButton
            display={'Back'}
            handleClick={handleView}
            operation={'Backward'}
          />
          <SalmonButton display={"Let's go"} handleClick={saveListing} />
        </div>
      )}
    </div>
  );
}

export default NewListingButtons;
