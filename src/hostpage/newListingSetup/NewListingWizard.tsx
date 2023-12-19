import NewListingStepOne from './newListingSteps/NewListingStepOne';
import NewListingStepTwo from './newListingSteps/NewListingStepTwo';
import NewListingStepThree from './newListingSteps/NewListingStepThree';
import NewListingStepFour from './newListingSteps/NewListingStepFour';
import NewListingStepFive from './newListingSteps/NewListingStepFive';
import NewListingStepSix from './newListingSteps/NewListingStepSix';
import Logo from '../../assets/Logo.png';
import { useState, useContext } from 'react';
import { HostPageContext } from '../HostPage';

/*
TODO: Make a component for the buttons
TODO: Change file structure
TODO: Add animated transitions
*/
function NewListingWizard() {
  const { setNewListingModalOpen } = useContext(HostPageContext)!;
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className='w-full'>
      <div className='pr-4 pl-4 pt-4 flex flex-col text-sm text-slate-700 min-h-[80px] w-full h-full'>
        <div className='flex w-full md:items-center md:justify-between md:pl-6 md:pr-6'>
          {/* Left */}
          <div className='hidden md:block'>
            <img className='h-[50px] mr-6' src={Logo}></img>
          </div>
          {/* Right */}
          <button
            onClick={() => setNewListingModalOpen(false)}
            className='border hover:bg-[#F6F6F6] rounded-full p-2 pl-4 pr-4 ml-6 mr-2'
          >
            Save & exit
          </button>
        </div>
        <div className='md:m-auto overflow-auto'>
          <div className='m-8 flex justify-center items-center'>
            {currentStep === 0 && <NewListingStepOne />}
            {currentStep === 1 && <NewListingStepTwo />}
            {currentStep === 2 && <NewListingStepThree />}
            {currentStep === 3 && <NewListingStepFour />}
            {currentStep === 4 && <NewListingStepFive />}
            {currentStep === 5 && <NewListingStepSix />}
          </div>
        </div>
        <div className='flex justify-center mb-8 mt-auto'>
          {/* Back button */}
          {currentStep !== 0 && (
            <div className='flex w-full justify-between ml-4 mr-4'>
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
              >
                Back
              </button>
              {/* Next button */}
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
              >
                {currentStep === 0 ? 'Get started' : 'Next'}
              </button>
            </div>
          )}
          {currentStep === 0 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
            >
              Get started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewListingWizard;
