import Logo from '../../assets/Logo.png';
import HostMenu from './components/HostMenu';
import { useNavigate } from 'react-router-dom';

function HostNavBar() {
  const navigate = useNavigate();

  return (
    <div className='pl-4 pt-4 flex flex-col items-center justify-between pr-4 text-sm border-b text-slate-700 md:min-h-[80px] text-sm'>
      <div className='flex w-full items-center justify-between pb-4'>
        {/* Left */}
        <div className='flex flex-row w-[50%]'>
          <img className='h-[50px] mr-6' src={Logo}></img>
        </div>
        {/* Center */}
        <div className='hidden md:block'>
          <HostMenu />
        </div>
        {/* Right */}
        <div className='w-[50%] text-end'>
          <button
            onClick={() => navigate('/browse')}
            className='hover:bg-[#F6F6F6] rounded-full p-2 ml-6'
          >
            Switch to booking
          </button>
        </div>
      </div>
      <div className='block mt-8 md:hidden pb-4'>
        <HostMenu />
      </div>
    </div>
  );
}

export default HostNavBar;