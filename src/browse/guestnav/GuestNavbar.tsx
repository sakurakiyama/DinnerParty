import Logo from '../../assets/Logo.png';
import SearchBar from './components/SearchBar';
import CalendarSelector from './components/CalendarSelector';
import GuestSelector from './components/GuestSelector';
import NavUserIcon from '../../components/NavUserIcon';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { BrowsePageContext } from '../BrowsePage';
import { UserContext } from '../../App';

/*
TODO: [] Adjust view for mobile
*/

function GuestNavBar() {
  const navigate = useNavigate();

  const { calendarContext, guestContext } = useContext(BrowsePageContext);
  const { dateOpen } = calendarContext;
  const { guestOpen } = guestContext;
  const { user } = useContext(UserContext)!;

  return (
    <div className='pl-4 pt-4 flex flex-col items-center justify-between pr-4 text-sm border-b text-slate-700 md:min-h-[80px]'>
      <div className='flex w-full items-center justify-between pb-4'>
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
          <div className='flex flex-row justify-end items-center'>
            <button
              onClick={() => navigate('/hosting')}
              className='hover:bg-[var(--light-grey)] rounded-full p-2 ml-6 mr-2 font-medium'
            >
              {user?.ishost ? 'Switch to hosting' : 'Become a host'}
            </button>
            <NavUserIcon />
          </div>
        </div>
      </div>
      <div className='block mt-8 md:hidden pb-4'>
        <SearchBar />
      </div>
      <div className={`mt-4 ${dateOpen ? 'block' : 'hidden'}`}>
        <CalendarSelector />
      </div>
      <div className={`mt-4 ${guestOpen ? 'block' : 'hidden'}`}>
        <GuestSelector />
      </div>
    </div>
  );
}

export default GuestNavBar;
