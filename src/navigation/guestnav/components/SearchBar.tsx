import { FaSearch } from 'react-icons/fa';
import { useState, useContext, useEffect } from 'react';
import { NavBarContext } from '../GuestNavbar';
import { formatDate } from '../../../utils';

// TODO: Implement logic for clicking outside the calendar and the add guest div to close respective divs.

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

  const handleSearch = () => {
    // TODO: Implement logic for searching the db for venues
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
    <div className='flex md:flex-row space-x-6 border p-2 pl-8 rounded-full items-center shadow-md text-slate-700 text-sm'>
      <div>
        <input
          className={`hover:transition-all outline-none max-w-[120px] md:max-w-[240px] text-center ${
            locationOpen ? 'w-[240px] md:text-left' : 'w-[120px]'
          }`}
          type='text'
          value={location}
          onClick={() => {
            if (guestOpen) setGuestOpen(false);
            else if (dateOpen) setDateOpen(false);
            setLocationOpen(true);
          }}
          onBlur={() => setLocationOpen(false)}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='Venue location'
        />
      </div>
      <span>|</span>
      <div className='min-w-[55px] text-center'>
        <button
          onClick={() => {
            if (guestOpen) setGuestOpen(false);
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
            if (dateOpen) setDateOpen(false);
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
