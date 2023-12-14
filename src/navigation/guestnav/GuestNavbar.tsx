import Logo from '../../assets/Logo.png';
import SearchBar from './components/SearchBar';
import Toggle from '../Toggle';
import { createContext, useState } from 'react';
import CalendarSelector from './components/CalendarSelector';

interface LocationProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

interface CalendarProps {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

interface SearchBarContextProps {
  locationContext: LocationProps;
  calendarContext: CalendarProps;
}

export const SearchBarContext = createContext<SearchBarContextProps>({
  locationContext: {
    location: '',
    setLocation: () => {},
  },
  calendarContext: {
    date: '',
    setDate: () => {},
  },
});

function GuestNavBar() {
  const [location, setLocation] = useState<LocationProps['location']>('');
  const [date, setDate] = useState<CalendarProps['date']>('');

  return (
    <SearchBarContext.Provider
      value={{
        locationContext: { location, setLocation },
        calendarContext: { date, setDate },
      }}
    >
      <div className='pl-4 pt-4 flex flex-col items-center justify-between pr-4'>
        <div className='flex w-full items-center justify-between'>
          {/* Left */}
          <div className='flex flex-row'>
            <img className='h-[50px]' src={Logo}></img>
          </div>
          {/* Center */}
          <div className='hidden md:block'>
            <SearchBar />
          </div>
          {/* Right */}
          <div className=''>
            <Toggle />
          </div>
        </div>
        <div className='block mt-8 md:hidden'>
          <SearchBar />
        </div>
        <div>
          <CalendarSelector />
        </div>
      </div>
    </SearchBarContext.Provider>
  );
}

export default GuestNavBar;
