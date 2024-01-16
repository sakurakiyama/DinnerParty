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
import ReviewSummary from './newListingSteps/ReviewSummary';
import Logo from '../../assets/Logo.png';
import { useState, useContext, createContext, useEffect } from 'react';
import { UserContext, HostContext } from '../../App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

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
  <AddTitle />,
  <AddDescription />,
  <AddPhotos />,

  // Step 3
  <PublishSummary />,
  <InstantBookAccess />,
  <SetPrice />,
  <SecurityCheck />,
  <ReviewSummary />,
];

interface NewListingWizardContextProps {
  currentView: number;
  setCurrentView: React.Dispatch<React.SetStateAction<number>>;
  pages: JSX.Element[];
  saveListing: () => void;
  slideIn: string;
  setSlideIn: React.Dispatch<React.SetStateAction<string>>;
}

export const NewListingWizardContext =
  createContext<NewListingWizardContextProps | null>(null);

function NewListingWizard() {
  const {
    setNewListingModalOpen,
    currentHostListing,
    setCurrentHostListing,
    setHostListings,
    setHost,
  } = useContext(HostContext)!;
  const [currentView, setCurrentView] =
    useState<NewListingWizardContextProps['currentView']>(0);
  const [slideIn, setSlideIn] =
    useState<NewListingWizardContextProps['slideIn']>('Right');

  const { setUser } = useContext(UserContext)!;

  useEffect(() => {
    const createListing = async () => {
      const { data } = await axios.post('/api/host/createListing');
      setUser(data.user);
      setHost(data.host);
      setCurrentHostListing(data.listing);
    };

    if (!currentHostListing) createListing();
  }, []);

  const saveListing = async () => {
    const { data } = await axios.post('/api/host/updateListing', {
      currentHostListing,
    });
    setHostListings(data.listings);
    setNewListingModalOpen(false);
    setCurrentHostListing(null);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <NewListingWizardContext.Provider
        value={{
          currentView,
          setCurrentView,
          pages,
          saveListing,
          slideIn,
          setSlideIn,
        }}
      >
        <div className='w-full'>
          <div className='pr-4 pl-4 pt-4 flex flex-col text-sm text-slate-700 min-h-[80px] w-full h-full'>
            <div className='flex w-full md:items-center md:justify-between md:pl-6 md:pr-6'>
              {/* Left */}
              <div className='hidden md:block'>
                <img className='h-[50px] mr-6' src={Logo}></img>
              </div>
              {/* Right */}
              <button
                onClick={saveListing}
                className='border hover:bg-[var(--light-grey)] rounded-full p-2 pl-4 pr-4 ml-6 mr-2'
              >
                Save & exit
              </button>
            </div>
            {pages[currentView]}
          </div>
        </div>
      </NewListingWizardContext.Provider>
    </DndProvider>
  );
}

export default NewListingWizard;
