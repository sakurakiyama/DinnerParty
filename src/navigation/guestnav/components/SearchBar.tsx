import { FaSearch } from 'react-icons/fa';
import { useState, useContext } from 'react';
import { SearchBarContext } from '../GuestNavbar';

function SearchBar() {
  const [locationOpen, setLocationOpen] = useState<boolean>(false);
  const { locationContext } = useContext(SearchBarContext)!;
  const { location, setLocation } = locationContext;

  const handleLocation = (value: string) => {
    setLocation(value);
  };
  const handleSearch = () => {
    console.log('Location is: ', location);
  };
  return (
    <div className='flex md:flex-row space-x-6 border p-2 pl-8 rounded-full items-center shadow-md text-slate-700	'>
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
        <button>Dates</button>
      </div>
      <span>|</span>
      <div>
        <button>Add guests</button>
      </div>
      <div className='flex items-center justify-center rounded-full w-[30px] h-[30px] bg-[var(--salmon)]'>
        <FaSearch onClick={handleSearch} className='text-white' />
      </div>
    </div>
  );
}

export default SearchBar;
