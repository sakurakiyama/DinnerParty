import Homes from '../../../../assets/Homes.png';
import NewListingWizardSummary from '../../../../components/NewListingWizardSummary';
import SalmonButton from '../../../../components/SalmonButton';
import { useContext } from 'react';
import { NewListingWizardContext } from '../../NewListingWizard';

function SpaceSummary() {
  const { currentView, setCurrentView, slideIn, setSlideIn } = useContext(
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
          header={'Tell us about your place'}
          description={
            "In this step, we'll ask you which type of property you have and if guests will book the entire place or just a specific room. Then let us know the location and how many guests can join."
          }
          image={Homes}
          step={1}
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
