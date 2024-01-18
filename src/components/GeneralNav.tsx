import Logo from '../assets/Logo.png';
import UserLogo from './NavUserIcon';
import { useNavigate } from 'react-router-dom';

function GeneralNav() {
  const navigate = useNavigate();

  return (
    <div className='pl-4 pt-4 flex flex-col items-center justify-between pr-4 text-sm border-b text-slate-700 md:min-h-[80px] text-sm'>
      <div className='flex w-full items-center justify-between pb-4'>
        {/* Left */}
        <div className='flex flex-row w-[50%]'>
          <img className='h-[50px] mr-6' src={Logo}></img>
        </div>
        {/* Center */}
        <div className='w-full'></div>
        {/* Right */}
        <div className='w-full text-end'>
          <div className='flex flex-row justify-end items-center'>
            <button
              onClick={() => navigate('/hosting')}
              className='hover:bg-[var(--light-grey)] whitespace-nowrap rounded-full p-2 ml-6 mr-2 font-medium'
            >
              Switch to booking
            </button>
            <UserLogo />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralNav;
