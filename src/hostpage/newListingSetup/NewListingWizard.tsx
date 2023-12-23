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
import { useState, useContext, createContext, useEffect } from 'react';
import { UserContext, HostContext } from '../../App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';

/*
TODO: Add animated transitions
*/

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

type SpaceDetails = {
  homeType: string;
  accessType: string;
  streetAddress: string;
  apt: string;
  city: string;
  state: string;
  zipCode: string;
  guests: number;
  diningAreas: number;
  bathrooms: number;
};

type MarketingDetails = {
  amenities: string[];
  photos: (string | ArrayBuffer | null)[];
  title: string;
  description: string;
};

type PublishingDetails = {
  instantBook: string;
  security: string[];
  basePrice: number;
};

interface NewListingWizardContextProps {
  spaceDetails: SpaceDetails;
  setSpaceDetails: React.Dispatch<React.SetStateAction<SpaceDetails>>;
  currentView: number;
  setCurrentView: React.Dispatch<React.SetStateAction<number>>;
  pages: JSX.Element[];
  saveListing: () => void;
  marketingDetails: MarketingDetails;
  setMarketingDetails: React.Dispatch<React.SetStateAction<MarketingDetails>>;
  publishingDetails: PublishingDetails;
  setPublishingDetails: React.Dispatch<React.SetStateAction<PublishingDetails>>;
}

export const NewListingWizardContext =
  createContext<NewListingWizardContextProps | null>(null);

function NewListingWizard() {
  const { setNewListingModalOpen } = useContext(HostContext)!;
  const [currentView, setCurrentView] =
    useState<NewListingWizardContextProps['currentView']>(0);
  const [spaceDetails, setSpaceDetails] = useState<SpaceDetails>({
    homeType: '',
    accessType: '',
    streetAddress: '',
    apt: '',
    city: '',
    state: '',
    zipCode: '',
    guests: 0,
    diningAreas: 0,
    bathrooms: 0,
  });

  const [marketingDetails, setMarketingDetails] = useState<MarketingDetails>({
    amenities: [],
    photos: [],
    title: '',
    description: '',
  });

  const [publishingDetails, setPublishingDetails] = useState<PublishingDetails>(
    {
      instantBook: '',
      security: [],
      basePrice: 100,
    }
  );

  const { setUser } = useContext(UserContext)!;

  useEffect(() => {
    const createListing = async () => {
      const { data } = await axios.post('/api/host/createListing');
      setUser(data.user);
      // update host context once you have it.
    };

    createListing();
  }, []);

  const saveListing = () => {
    // TODO: Send data to backend
    setNewListingModalOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <NewListingWizardContext.Provider
        value={{
          spaceDetails,
          setSpaceDetails,
          currentView,
          setCurrentView,
          pages,
          saveListing,
          marketingDetails,
          setMarketingDetails,
          publishingDetails,
          setPublishingDetails,
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
                onClick={() => setNewListingModalOpen(false)}
                className='border hover:bg-[#F6F6F6] rounded-full p-2 pl-4 pr-4 ml-6 mr-2'
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
