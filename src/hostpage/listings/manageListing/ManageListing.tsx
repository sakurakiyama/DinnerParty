import HostNavBar from '../../hostnav/HostNavBar';
import Sidebar from './Sidebar';
import ListingDashboard from './listingDashboard/ListingDashboard';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { HostContext } from '../../../App';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';
import { FaBoltLightning } from 'react-icons/fa6';
import ListingDetails from './listingDashboard/listingDetails/ListingDetails';
import Photos from './listingDashboard/listingDetails/Photos';
import ListingBasics from './listingDashboard/listingDetails/ListingBasics';
import Amenities from './listingDashboard/listingDetails/Amenities';
import Location from './listingDashboard/listingDetails/Location';
import PropertyAndRooms from './listingDashboard/listingDetails/PropertyAndRooms';
import Accessibility from './listingDashboard/listingDetails/Accessibility';
import PoliciesAndRules from './listingDashboard/policiesAndRules/PoliciesAndRules';
import GuestRequirements from './listingDashboard/policiesAndRules/GuestRequirements';
import HouseRules from './listingDashboard/policiesAndRules/HouseRules';
import LawsAndRegulations from './listingDashboard/policiesAndRules/LawsAndRegulations';
import Policies from './listingDashboard/policiesAndRules/Policies';
import InfoForGuests from './listingDashboard/infoForGuests/InfoForGuests';
import AfterBooking from './listingDashboard/infoForGuests/AfterBooking';
import BeforeBooking from './listingDashboard/infoForGuests/BeforeBooking';

export type Subsection = {
  header: string;
  component: React.ReactNode;
};

interface Section {
  sectionHeader: string;
  sectionComponent: React.ReactNode;
  subsections: Subsection[];
}

interface ManageListingProps {
  currentOpenSection: number;
  setCurrentOpenSection: React.Dispatch<React.SetStateAction<number>>;
  currentSubSection: number;
  setCurrentSubSection: React.Dispatch<React.SetStateAction<number>>;
  sections: Section[];
}

export const ManageListingContext = createContext<ManageListingProps | null>(
  null
);

function ManageListing() {
  const {
    setHostListings,
    host,
    setHost,
    currentHostListing,
    setCurrentHostListing,
  } = useContext(HostContext)!;

  const [currentOpenSection, setCurrentOpenSection] = useState<number>(0);
  const [currentSubSection, setCurrentSubSection] = useState<number>(0);
  const [listingStatus, setListingStatus] = useState<ReactNode | undefined>(
    undefined
  );
  const [instantBook, setInstantBook] = useState<ReactNode | undefined>(
    undefined
  );

  const { listingid } = useParams();

  const sections = [
    {
      sectionHeader: 'Listing Details',
      sectionComponent: <ListingDetails />,
      subsections: [
        { header: 'Photos', component: <Photos /> },
        { header: 'Listing basics', component: <ListingBasics /> },
        { header: 'Amenities', component: <Amenities /> },
        { header: 'Location', component: <Location /> },
        { header: 'Property and rooms', component: <PropertyAndRooms /> },
        { header: 'Accessibility', component: <Accessibility /> },
      ],
    },
    {
      sectionHeader: 'Policies and Rules',
      sectionComponent: <PoliciesAndRules />,
      subsections: [
        { header: 'Policies', component: <Policies /> },
        { header: 'House rules', component: <HouseRules /> },
        { header: 'Guest requirements', component: <GuestRequirements /> },
        { header: 'Laws and regulations', component: <LawsAndRegulations /> },
      ],
    },
    {
      sectionHeader: 'Info for guests',
      sectionComponent: <InfoForGuests />,
      subsections: [
        { header: 'Before booking', component: <BeforeBooking /> },
        { header: 'After booking', component: <AfterBooking /> },
      ],
    },
  ];

  useEffect(() => {
    switch (currentHostListing?.status) {
      case 'Listed':
        setListingStatus(
          <div className='flex items-center'>
            <FaCircle size={20} color={'green'} className='pr-2' />
            <div>Listed</div>
          </div>
        );
        break;

      case 'Ready':
        setListingStatus(
          <div className='flex items-center'>
            <MdPendingActions size={22} className='pr-2' />
            <div>Ready</div>
          </div>
        );
        break;
    }

    const color = currentHostListing?.instantbook ? 'green' : '#D3D3D3';

    setInstantBook(
      <div className='flex flex-row items-center'>
        <FaBoltLightning size={18} className='pr-2' color={color} />
        <div>
          {currentHostListing?.instantbook
            ? 'Instant Book on'
            : 'Instant Book off'}
        </div>
      </div>
    );
  }, [currentHostListing]);

  useEffect(() => {
    if (!host) {
      const getHostData = async () => {
        const { data } = await axios.get(`/api/host/getHostData`);
        setHost(data.host);
        setHostListings(data.listings);
      };
      getHostData();
    }

    if (!currentHostListing) {
      const getListing = async () => {
        const { data: currentListing } = await axios.get(
          `/api/host/getListing/${listingid}`
        );
        setCurrentHostListing(currentListing);
      };
      getListing();
    }
  }, []);

  return (
    <ManageListingContext.Provider
      value={{
        currentOpenSection,
        setCurrentOpenSection,
        sections,
        currentSubSection,
        setCurrentSubSection,
      }}
    >
      <div>
        <div>
          <HostNavBar />
        </div>
        <div className='p-6 text-slate-700'>
          {/* Listing Header */}
          <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row w-full'>
            <div className='text-2xl mr-auto font-black'>
              {currentHostListing?.title}
            </div>
            {/* Insant Book and Status */}
            <div className='flex flex-row space-x-6 items-center text-sm mr-6 pt-4 md:pt-0'>
              {instantBook}
              {listingStatus}
            </div>
            {/* Preview Button */}
            <button className='hover:bg-[var(--light-grey)] flex justify-center items-center border border-black p-2 pr-4 pl-4 rounded-md text-sm w-fit'>
              Preview Listing
            </button>
          </div>
          {/* Sidebar and Dashboard */}
          <div className='flex flex-col md:flex-row pt-8 w-full md:space-x-16'>
            <div className='md:min-w-[200px] md:w-[30%]'>
              <Sidebar />
            </div>
            <div className='w-full overflow-x-hidden'>
              <ListingDashboard />
            </div>
          </div>
        </div>
      </div>
    </ManageListingContext.Provider>
  );
}

export default ManageListing;
