import Homes from '../../../../assets/HomeSend.png';
import NewListingWizardSummary from '../../../../components/NewListingWizardSummary';
import SalmonButton from '../../../../components/SalmonButton';
import { useContext } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';

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
          header={'Finish up and publish'}
          description={
            "Finally, you'll choose booking settings, set up pricing, and publish your listing."
          }
          image={Homes}
          step={3}
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
