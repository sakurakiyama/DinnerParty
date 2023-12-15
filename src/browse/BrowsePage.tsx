import GuestNavBar from './guestnav/GuestNavbar';
import { createContext, useState, useContext } from 'react';
import { UserContext } from '../App';

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

  const { user } = useContext(UserContext)!;

  /*
  TODO: If the user doesn't have a first name or last name, open up a modal to walk them through the profile creation process. 
  - First name is required
  - Last name is required 
  */
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
        <GuestNavBar />
      </div>
    </BrowsePageContext.Provider>
  );
}

export default BrowsePage;
