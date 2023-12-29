import HomesExtra from '../../../../assets/HomesExtra.png';
import NewListingWizardSummary from '../../../../components/NewListingWizardSummary';
import { useContext } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';
import SalmonButton from '../../../../components/SalmonButton';

function SpaceSummary() {
  const { currentView, setCurrentView, setSlideIn, slideIn } = useContext(
    NewListingWizardContext
  )!;

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
      <div className='mt-10 md:mt-auto'>
        <NewListingWizardSummary
          header={'Make your place stand out'}
          description={
            'In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.'
          }
          image={HomesExtra}
          step={2}
        />
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
            disabled={false}
          />
        </div>
      </div>
    </div>
  );
}

export default SpaceSummary;
