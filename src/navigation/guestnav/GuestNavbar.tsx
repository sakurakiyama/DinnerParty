import Logo from '../../assets/Logo.png';
import SearchBar from './components/SearchBar';
import Toggle from '../Toggle';
import { createContext, useState } from 'react';
import CalendarSelector from './components/CalendarSelector';
import GuestSelector from './components/GuestSelector';

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

interface NavBarContextProps {
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

export const NavBarContext = createContext<NavBarContextProps>({
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

function GuestNavBar() {
  const [location, setLocation] = useState<LocationProps['location']>('');
  const [date, setDate] = useState<CalendarProps['date']>('Date');
  const [dateOpen, setDateOpen] = useState<CalendarProps['dateOpen']>(false);
  const [guests, setGuests] = useState<GuestInfo[]>(initialGuests);
  const [guestOpen, setGuestOpen] = useState<GuestProps['guestOpen']>(false);

  return (
    <NavBarContext.Provider
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
      <div className='pl-4 pt-4 flex flex-col items-center justify-between pr-4'>
        <div className='flex w-full items-center justify-between border-b pb-4'>
          {/* Left */}
          <div className='flex flex-row w-[50%]'>
            <img className='h-[50px] mr-6' src={Logo}></img>
          </div>
          {/* Center */}
          <div className='hidden md:block'>
            <SearchBar />
          </div>
          {/* Right */}
          <div className='w-[50%] text-end'>
            <Toggle />
          </div>
        </div>
        <div className='block mt-8 md:hidden'>
          <SearchBar />
        </div>
        <div className={`mt-4 ${dateOpen ? 'block' : 'hidden'}`}>
          <CalendarSelector />
        </div>
        <div className={`mt-4 ${guestOpen ? 'block' : 'hidden'}`}>
          <GuestSelector />
        </div>
      </div>
    </NavBarContext.Provider>
  );
}

export default GuestNavBar;
