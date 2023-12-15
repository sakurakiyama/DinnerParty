import { FaSearch } from 'react-icons/fa';
import { useState, useContext, useEffect } from 'react';
import { NavBarContext } from '../GuestNavbar';
import { formatDate } from '../../../utils';

interface TotalGuestCount {
  totalGuests: number;
  totalInfants: number;
  totalPets: number;
}

function SearchBar() {
  const [locationOpen, setLocationOpen] = useState<boolean>(false);
  const [totalGuestCount, setTotalGuestCount] = useState<
    TotalGuestCount | undefined
  >(undefined);

  const { locationContext, calendarContext, guestContext } =
    useContext(NavBarContext);
  const { location, setLocation } = locationContext;
  const { date, dateOpen, setDateOpen } = calendarContext;
  const { guests, guestOpen, setGuestOpen } = guestContext;

  const handleLocation = (value: string) => {
    setLocation(value);
  };

  const handleSearch = () => {
    console.log('Location is: ', location);
  };

  useEffect(() => {
    let totalGuests = 0;
    let totalInfants = 0;
    let totalPets = 0;

    for (const obj of guests) {
      const category = obj.category;
      if (category === 'Adults' || category === 'Children')
        totalGuests += obj.count;
      else if (category === 'Infants') totalInfants += obj.count;
      else if (category === 'Pets') totalPets += obj.count;
    }

    const result: TotalGuestCount = { totalGuests, totalInfants, totalPets };
    setTotalGuestCount(result);
  }, [guests]);

  return (
    <div className='flex md:flex-row space-x-6 border p-2 pl-8 rounded-full items-center shadow-md text-slate-700 text-xs md:text-base	'>
      <div>
        <input
          className={`hover:transition-all outline-none max-w-[120px] md:max-w-[240px] text-center ${
            locationOpen ? 'w-[240px] md:text-left' : 'w-[120px]'
          }`}
          type='text'
          value={location}
          onClick={() => setLocationOpen(true)}
          onBlur={() => setLocationOpen(false)}
          onChange={(e) => handleLocation(e.target.value)}
          placeholder='Venue location'
        />
      </div>
      <span>|</span>
      <div>
        <button
          onClick={() => {
            dateOpen ? setDateOpen(false) : setDateOpen(true);
          }}
        >
          {date === 'Date' ? date : formatDate(new Date(date))}
        </button>
      </div>
      <span>|</span>
      <div>
        <button
          className='w-[100px] overflow-hidden whitespace-nowrap overflow-ellipsis'
          onClick={() => {
            guestOpen ? setGuestOpen(false) : setGuestOpen(true);
          }}
        >
          {!totalGuestCount?.totalGuests &&
          !totalGuestCount?.totalInfants &&
          !totalGuestCount?.totalPets
            ? 'Add Guests'
            : `${totalGuestCount.totalGuests} guests, ${totalGuestCount.totalInfants} infants ${totalGuestCount.totalPets} pets`}
        </button>
      </div>
      <div className='flex items-center justify-center rounded-full w-[30px] h-[30px] bg-[var(--salmon)]'>
        <FaSearch onClick={handleSearch} className='text-white' />
      </div>
    </div>
  );
}

export default SearchBar;
