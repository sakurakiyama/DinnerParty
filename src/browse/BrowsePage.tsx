import GuestNavBar from './guestnav/GuestNavbar';
import { createContext, useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import InitialProfileCard from './InitialProfileCard';

interface LocationProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

interface CalendarProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  dateOpen: boolean;
  setDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export enum GuestCategory {
  Adults = 'Adults',
  Children = 'Children',
  Infants = 'Infants',
  Pets = 'Pets',
}

interface GuestInfo {
  category: GuestCategory;
  description: string;
  count: number;
}

interface GuestProps {
  guests: GuestInfo[];
  setGuests: React.Dispatch<React.SetStateAction<GuestInfo[]>>;
  guestOpen: boolean;
  setGuestOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BrowsePageContextProps {
  locationContext: LocationProps;
  calendarContext: CalendarProps;
  guestContext: GuestProps;
}

const initialGuests: GuestInfo[] = [
  {
    category: GuestCategory.Adults,
    description: 'Ages 13 and above',
    count: 0,
  },
  { category: GuestCategory.Children, description: '2-12', count: 0 },
  { category: GuestCategory.Infants, description: 'Under 2', count: 0 },
  { category: GuestCategory.Pets, description: 'Service animals', count: 0 },
];

export const BrowsePageContext = createContext<BrowsePageContextProps>({
  locationContext: {
    location: '',
    setLocation: () => {},
  },
  calendarContext: {
    date: 'Date',
    setDate: () => {},
    dateOpen: false,
    setDateOpen: () => {},
  },
  guestContext: {
    guests: initialGuests,
    setGuests: () => {},
    guestOpen: false,
    setGuestOpen: () => {},
  },
});

function BrowsePage() {
  const [location, setLocation] = useState<LocationProps['location']>('');
  const [date, setDate] = useState<CalendarProps['date']>('Date');
  const [dateOpen, setDateOpen] = useState<CalendarProps['dateOpen']>(false);
  const [guests, setGuests] = useState<GuestInfo[]>(initialGuests);
  const [guestOpen, setGuestOpen] = useState<GuestProps['guestOpen']>(false);
  const [profileSetupModalOpen, setProfileSetupModalOpen] =
    useState<boolean>(false);

  const { user } = useContext(UserContext)!;

  useEffect(() => {
    /*
    TODO: If the user doesn't have a first name or last name, open up a modal to walk them through the profile creation process. 
    - First name is required. No symbols
    - Last name is required. No symbols
    */
    if (!user?.firstname || !user?.lastname) {
      setProfileSetupModalOpen(true);
    }

    if (user?.firstname && user?.lastname) {
      setProfileSetupModalOpen(false);
    }
  }, [user]);

  return (
    <BrowsePageContext.Provider
      value={{
        locationContext: { location, setLocation },
        calendarContext: {
          date,
          setDate,
          dateOpen,
          setDateOpen,
        },
        guestContext: {
          guests,
          setGuests,
          guestOpen,
          setGuestOpen,
        },
      }}
    >
      <div>
        {profileSetupModalOpen && (
          <div className='top-0 bottom-0 left-0 right-0 fixed flex items-center justify-center bg-[#00000011] backdrop-filter backdrop-blur-sm'>
            <InitialProfileCard
              setProfileSetupModalOpen={setProfileSetupModalOpen}
            />
          </div>
        )}
        <GuestNavBar />
      </div>
    </BrowsePageContext.Provider>
  );
}

export default BrowsePage;
