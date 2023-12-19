import NewListingSummary from './newListingSteps/NewListingSummary';
import SpaceSummary from './newListingSteps/space/SpaceSummary';
import HomeType from './newListingSteps/space/HomeType';
import HomeAccess from './newListingSteps/space/HomeAccess';
import HomeLocation from './newListingSteps/space/HomeLocation';
import BasicDetails from './newListingSteps/space/BasicDetails';
import MarketingSummary from './newListingSteps/marketing/MarketingSummary';
import BasicAmenities from './newListingSteps/marketing/BasicAmenities';
import AddPhotos from './newListingSteps/marketing/AddPhotos';
import AddTitle from './newListingSteps/marketing/AddTitle';
import AddDescription from './newListingSteps/marketing/AddDescription';
import PublishSummary from './newListingSteps/publish/PublishSummary';
import InstantBookAccess from './newListingSteps/publish/InsantBookAccess';
import SetPrice from './newListingSteps/publish/SetPrice';
import SecurityCheck from './newListingSteps/publish/SecurityCheck';
import ReviewSummary from './ReviewSummary';
import Logo from '../../assets/Logo.png';
import { useState, useContext } from 'react';
import { HostPageContext } from '../HostPage';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/*
TODO: Make a component for the buttons
TODO: Add animated transitions
*/
function NewListingWizard() {
  const { setNewListingModalOpen } = useContext(HostPageContext)!;
  const [currentView, setCurrentView] = useState<number>(0);

  const pages = [
    <NewListingSummary />,

    // Step 1
    <SpaceSummary />,
    <HomeType />,
    <HomeAccess />,
    <HomeLocation />,
    <BasicDetails />,

    // Step 2
    <MarketingSummary />,
    <BasicAmenities />,
    <AddPhotos />,
    <AddTitle />,
    <AddDescription />,

    // Step 3
    <PublishSummary />,
    <InstantBookAccess />,
    <SetPrice />,
    <SecurityCheck />,
    <ReviewSummary />,
  ];

  return (
    <DndProvider backend={HTML5Backend}>
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
              {pages[currentView]}
            </div>
          </div>
          <div className='flex justify-center mb-8 mt-auto'>
            {/* Back button */}
            {currentView !== 0 && (
              <div className='flex w-full justify-between ml-4 mr-4'>
                <button
                  onClick={() => setCurrentView(currentView - 1)}
                  className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
                >
                  Back
                </button>
                {/* Next button */}
                <button
                  onClick={() => setCurrentView(currentView + 1)}
                  className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
                >
                  {currentView === 0 ? 'Get started' : 'Next'}
                </button>
              </div>
            )}
            {currentView === 0 && (
              <button
                onClick={() => setCurrentView(currentView + 1)}
                className='rounded-full p-2 pl-8 pr-8 text-white bg-[var(--salmon)]'
              >
                Get started
              </button>
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default NewListingWizard;
